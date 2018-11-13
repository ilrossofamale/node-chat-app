var socket = io();								//inizializza la richiesta verso il server, apre e MANTIENE APERTA la comunicazione


function scrollToBottom() {
	//selectors
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}


socket.on('connect', function() {
	console.log('Connesso al server');

	var params = $.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('tutto OK!');
		}
	});


	//socket.emit('createMessage', {				//definizione di un custom event CLIENT->SERVER ('nome evento', 'oggetto con le informazioni inviate')
	//	from: 'jhonny@mnemonic.it',
	//	text:'Ciao di nuovo'
	//})

});

socket.on('disconnect', function() {
	console.log('Disconnesso dal server');
});


socket.on('updateUserList', function(users) {
	console.log('Users List', users);
	var ol = $('<ol/>');
	users.forEach(function(users){
		ol.append($('<li/>').text(users));
	});
	$('#users').html(ol);
})


socket.on('newMessage', function(message) {						//custom SERVER->CLIENT event definito in server.js function('dati inviati dal server')
	var formattedTime = moment(message.createAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	$('#messages').append(html);
	scrollToBottom();
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
	$('#messages').append(html);
	scrollToBottom();
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


