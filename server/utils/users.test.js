const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
	//Definisco un array DUMMY per gli utenti, beforeEach è lanciato per OGNI test
	var users;
	beforeEach( () => {
		users = new Users();
		users.users = [{
			id:'1',
			name: 'Marco',
			room: 'Node Course'
		},
		{
			id:'2',
			name: 'Silvia',
			room: 'React Course'
		},
		{
			id:'3',
			name: 'Pietro',
			room: 'Node Course'
		},
		{
			id:'4',
			name: 'Emma',
			room: 'React Course'
		}]
	});

	it('Aggiunge un utente', () => {
		var users = new Users(); 											//Nuova istanza du Users
		var user = {														//Utente da aggiunger
			id:'123',
			name: 'Gino',
			room: 'BellaStanza'
		}
		var resUser = users.addUser(user.id, user.name, user.room);			//Chiamata al metodo
		expect(users.users).toEqual([user]);								//Verifico corretteza inserimento
	});


	it('Restituisce i nomi per Node Course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Marco','Pietro']);
	})

	it('Restituisce i nomi per React Course', () => {
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Silvia','Emma']);
	})


	it('Dovrebbe cancellare un Utente', () => {
		var userId = '1';
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(3);
	})

	it('Non dovrebbe cancellare un Utente', () => {
		var userId = '99';
		var user = users.removeUser(userId);
		expect(user).toBeUndefined();
		expect(users.users.length).toBe(4);
	})

	it('Dovrebbe trovare un Utente', () => {
		var userId = '1';
		var user = users.getUser(userId);
		expect(user).toEqual({id:'1', name: 'Marco', room: 'Node Course'});
		expect(user.id).toBe(userId);
	})

	it('Non Dovrebbe trovare un Utente', () => {
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toBeUndefined();
	})

});