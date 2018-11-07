var socket = io();								//inizializza la richiesta verso il server, apre e MANTIENE APERTA la comunicazione

socket.on('connect', function() {
	//console.log('Connesso al server');

	//socket.emit('createMessage', {				//definizione di un custom event CLIENT->SERVER ('nome evento', 'oggetto con le informazioni inviate')
	//	from: 'jhonny@mnemonic.it',
	//	text:'Ciao di nuovo'
	//})

});

socket.on('disconnect', function() {
	console.log('Disconnesso dal server');
});


socket.on('newMessage', function(message) {				//custom SERVER->CLIENT event definito in server.js function('dati inviati dal server')
	console.log('Nuovo Messaggio dal server', message);
})