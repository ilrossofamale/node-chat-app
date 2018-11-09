//		timestamp non sono altro che interi che rappresentano date precise espresse in millisecondi
//		0 === Jan 1st 1970 00:00:00 am === anno zero
//		-1000 === Dec 31st 1969 23:59:59 am === un secondo prima dell'anno zero
//		100000 === Jan 1st 1970 00:00:10 am === dieci secondi dopo l'anno zero

var moment = require('moment');

//var date = moment();

//date.locale('it')


//Per il formato della stringa fare riferimento alla DOCS online
//console.log(date.format('h:mm a'));

var timeStamp = moment().valueOf();			//equivalente a new Date().getTime();
console.log(timeStamp);


var createdAt = 1234						//timestamp
var date = moment(1234)						//conversione
console.log(date.format('h:mm a'));