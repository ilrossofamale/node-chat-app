var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');


describe('generateMessage', () => {

	it('Genera l\'oggetto del messaggio', () => {
		var dummyFrom = 'Utente';
		var dummyTxt = 'Testo del messaggio';
		var objectMessage = generateMessage(dummyFrom,dummyTxt);
		expect(objectMessage.from).toBe(dummyFrom);
		expect(objectMessage.text).toBe(dummyTxt);
		expect(typeof objectMessage.generateAt).toBe('number');
	});

});


describe('generateLocationMessage', () => {

	it('Genera l\'oggetto del messaggio relativo alla localizzazione dati i valori di latitudine e longitudine', () => {
		var dummyFrom = 'Utente';
		var dummyLat = 1;
		var dummyLong = 1;
		var dummyUrl = 'https://www.google.com/maps?q=1,1'
		var objectMessage = generateLocationMessage(dummyFrom,dummyLat,dummyLong);
		expect(objectMessage.url).toBe(dummyUrl);
		expect(typeof objectMessage.generateAt).toBe('number');
	});

});