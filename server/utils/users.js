/*[{
	id: '/asdfjlkasjfklasjdfklsjadfl',
	user: 'Nome'
	room: 'NOme stanza'
}]*/

// addUSer(id,user,room);
//removeUSer(id);
//getUser(id);
//getUSerList(room);


class Users {
	constructor() {
		this.users = [];
	}
	addUser(id,name,room) {
		var user = {id, name,room};
		this.users.push(user);
		return user
	}
	removeUser(id) {
		var user = this.getUser(id);
		if(user) {
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user
	}
	getUser(id) {
		var user = this.users.filter((user) => user.id === id )[0];								//
		return user
	}
	getUserList(room) {
		var users = this.users.filter((user) => user.room === room );						//restituisce il valore (true) se la stanza dentro user (user.room) metcha con la stanza passata(room) salvandoli in un nuovo array 
		var namesArray = users.map((user) => user.name);
		return namesArray;
	}
}


module.exports = {Users};


//ES6 CLASSES
/*class Person {
	//constructor è una funzione specifica per class ed è inizializzata automaticamente
	constructor (name,age) {
		this.name = name;
		this.age = age;
	}
	getUserDescription() {
		return `${this.name} is ${this.age} year(s) old`;
	}
}

var me = new Person('Marco',25);
var description = me.getUserDescription();
console.log(description);*/