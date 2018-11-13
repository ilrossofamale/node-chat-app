var expect = require('expect');
var {isRealString} = require('./validation');



describe('isRealString', () => {
	it('Rifiutare valori non string', () => {
		var string = 123456;
		expect(isRealString(string)).toBeFalsy();
	});
	it('Rifiutare valori di soli spazi', () => {
		var string = '      ';
		expect(isRealString(string)).toBeFalsy();
	});
	it('Accettare stringhe ben formattate senza spazi', () => {
		var string = '   Marco&theCoccunat   ';
		expect(isRealString(string)).toBeTruthy();
	});
});