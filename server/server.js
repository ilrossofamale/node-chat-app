const path = require('path');
const http = require('http');
const exp = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;


var app = exp();																		//applicazione express
var server = http.createServer(app);													//creo un server utilizzando il modulo http nativo di node
var io = socketIO(server);																//in questo modo configuro il server per funzionare con il web socket


app.use(exp.static(publicPath));

io.on('connection', (socket) => {														//registro l'evento (connection) e gli passo l'oggetto socket definito dentro il client
	console.log('Nuovo utente collegato');


	//socket.emit('newMessage', {														//definizione di un custom event SERVER->CLIENT ('nome evento', 'oggetto con le informazioni inviate')
	//	from: 'mike@example.com',
	//	text: 'Hey, come va?',
	//	createAt: 123456
	//});

	socket.emit('newMessage', generateMessage('Admin','Benvenuto nella chat'));
	socket.broadcast.emit('newMessage', generateMessage('Admin','Un nuovo utente si è collegato'))



	socket.on('createMessage', (message,callback) => {									//custom CLIENT->SERVER event definito in index.js ('dati inviati al server','funzione inviata dal client per farsi restituire,il client, il messaggio dell'avvenuta ricezione del messaggio')
		console.log('Messaggio ricevuto dal client', message);
		io.emit('newMessage', generateMessage(message.from,message.text))				//definisco un emitter su TUTTE le connessioni attive

		callback('Questo è inviato dal server');										//chiamata alla callback devinita nell'emitter createMessage (index.js)

		//socket.broadcast.emit('newMessage', {											//definisco un emitter su TUTTE le connessioni attive tranne quella che ha mandato il messaggio
		//	from: message.from,
		//	text: message.text,
		//	createAt: new Date().toLocaleString()
		//})
	})

	socket.on('disconnect', (soket) => {
		console.log('Utente scollegato');
	})
});


server.listen(port, () => {
	console.log(`Avviata sulla porta ${port}`);
});



//NOTE IMPORTANTI
// soket.emit() 													emette l'evento sulla singola connessione diretta 1->1
// io.emit()														emette la connessione su tutte le connessini attive al servizio 1->ALL
// socket.broadcast.emit()											emette la connessione su tutte le connessini attive al servizio tranne a chi l'ha inviato !1->ALL