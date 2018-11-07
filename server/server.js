const path = require('path');
const http = require('http');
const exp = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;


var app = exp();											//applicazione express
var server = http.createServer(app);						//creo un server utilizzando il modulo http nativo di node
var io = socketIO(server);									//in questo modo configuro il server per funzionare con il web socket


app.use(exp.static(publicPath));

io.on('connection', (socket) => {							//registro l'evento (connection) e gli passo l'oggetto socket definito dentro il client
	console.log('Nuovo utente collegato');


	socket.emit('newMessage', {								//definizione di un custom event SERVER->CLIENT ('nome evento', 'oggetto con le informazioni inviate')
		from: 'mike@example.com',
		text: 'Hey, come va?',
		createAt: new Date().toLocaleString()
	});


	socket.on('createMessage', (message) => {					//custom CLIENT->SERVER event definito in index.js ('dati inviati al server')
		console.log('Messaggio ricevuto', message);
	})

	socket.on('disconnect', (soket) => {
		console.log('Utente scollegato');
	})
});


server.listen(port, () => {
	console.log(`Avviata sulla porta ${port}`);
});