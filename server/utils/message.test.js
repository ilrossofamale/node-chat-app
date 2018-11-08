var expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage', () => {

	it('Genera l\'oggetto del messaggio', () => {
		var dummyFrom = 'Utente';
		var dummyTxt = 'Testo del messaggio';
		var objectMessage = generateMessage(dummyFrom,dummyTxt);
		
		expect(objectMessage.from).toBe(dummyFrom);
		expect(objectMessage.text).toBe(dummyTxt);
		expect(typeof objectMessage.generateAt).toBe('number');
	})

});