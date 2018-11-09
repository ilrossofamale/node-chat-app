var socket = io();								//inizializza la richiesta verso il server, apre e MANTIENE APERTA la comunicazione

socket.on('connect', function() {
	console.log('Connesso al server');

	//socket.emit('createMessage', {				//definizione di un custom event CLIENT->SERVER ('nome evento', 'oggetto con le informazioni inviate')
	//	from: 'jhonny@mnemonic.it',
	//	text:'Ciao di nuovo'
	//})

});

socket.on('disconnect', function() {
	console.log('Disconnesso dal server');
});


socket.on('newMessage', function(message) {						//custom SERVER->CLIENT event definito in server.js function('dati inviati dal server')
	
	var formattedTime = moment(message.createAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	$('#messages').append(html);
});

//socket.emit('createMessage', {								//custom CLIENT->SERVER
//	from: 'Frank',
//	text: 'Ciao'
//}, function(data) {											//questa callback viene inviata ed eseguita dal server che mi darà in RISPOSTA il messaggio
//	console.log('Ricevuto!', data);
//});


$('#message-form').on('submit', function(e) {
	e.preventDefault();
	var messageTextbox = $('[name=message]');
	socket.emit('createMessage', {
		from:'User',
		text: messageTextbox.val()
	}, function(){
		messageTextbox.val('');
	})
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	})

	/*var li = $('<li/>');
	var a = $('<a target="_blank">Io sono qua</a>');
	li.text(`${message.from} ${formattedTime}, `);
	a.attr('href',message.url);
	li.append(a);*/
	$('#messages').append(html);
});


var locationButton = $('#send-location');
locationButton.on('click', function(e) {
	if( !navigator.geolocation ) {
		return alert('Geolocalizzanione non supportata dal browser')
	}

	locationButton.attr('disabled', 'disabled').text('Invia Posizione...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Invia Posizione');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		})
	}, function() {
		locationButton.removeAttr('disabled').text('Invia Posizione');
		alert('Non capisco dove sei')
	})
});
