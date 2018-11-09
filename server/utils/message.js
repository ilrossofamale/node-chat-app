const moment = require('moment');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		generateAt: moment().valueOf()
	}
}

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url:`https://www.google.com/maps?q=${latitude},${longitude}`,
		generateAt: moment().valueOf()
	}
}


module.exports = {generateMessage,generateLocationMessage}