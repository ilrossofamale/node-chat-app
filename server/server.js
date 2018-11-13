/*
	Per completare il progetto ggiungere:
	- Insensitive case sul nome della stanza
	- Rifiutare lo stesso nome utente
	- Mostrare nella login una lista delle stanze gia attive
*/

const path = require('path');
const http = require('http');
const exp = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;


var app = exp();																		//applicazione express
var server = http.createServer(app);													//creo un server utilizzando il modulo http nativo di node
var io = socketIO(server);
var users = new Users();																//in questo modo configuro il server per funzionare con il web socket


app.use(exp.static(publicPath));

io.on('connection', (socket) => {														//registro l'evento (connection) e gli passo l'oggetto socket definito dentro il client
	console.log('Nuovo utente collegato');
	//socket.emit('newMessage', {														//definizione di un custom event SERVER->CLIENT ('nome evento', 'oggetto con le informazioni inviate')
	//	from: 'mike@example.com',
	//	text: 'Hey, come va?',
	//	createAt: 123456
	//});
	socket.on('join', (params,callback) => {
		//verifico i parametri passati (param)
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Nome e Nome stanza sono obbligatori');
		}
		socket.join(params.room);
		//per aggiornare la lista degli utenti collegati in una certa stanza
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin','Benvenuto nella chat'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} si è collegato alla stanza`));
		callback();
	});
	socket.on('createMessage', (message,callback) => {									//custom CLIENT->SERVER event definito in index.js ('dati inviati al server','funzione inviata dal client per farsi restituire,il client, il messaggio dell'avvenuta ricezione del messaggio')
		//console.log('Messaggio ricevuto dal client', message);
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name,message.text))				//definisco un emitter su TUTTE le connessioni attive
		}
		callback();																		//chiamata alla callback devinita nell'emitter createMessage (index.js)
		//socket.broadcast.emit('newMessage', {											//definisco un emitter su TUTTE le connessioni attive tranne quella che ha mandato il messaggio
		//	from: message.from,
		//	text: message.text,
		//	createAt: new Date().toLocaleString()
		//})
	});
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if(user) {
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
		}
	});
	socket.on('disconnect', (soket) => {
		console.log('Utente scollegato');
		var user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} ha lasciato la stanza`))
		}
	})
});


server.listen(port, () => {
	console.log(`Avviata sulla porta ${port}`);
});



//NOTE IMPORTANTI
// soket.emit() 													emette l'evento sulla singola connessione diretta 1->1
// io.emit()														emette la connessione su tutte le connessini attive al servizio 1->ALL
// socket.broadcast.emit()											emette la connessione su tutte le connessini attive al servizio tranne a chi l'ha inviato !1->ALL
// io.to('Nome della stanza')										emette l'evento a tutte le persone connesse ad una stanza specifica
// socket.broadcast.to('Nome della stanza')							emette la connessione su tutte le connessini attive alla stanze tranne a chi l'ha inviato !1->ALL