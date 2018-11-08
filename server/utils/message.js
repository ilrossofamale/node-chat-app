var generateMessage = (from, text) => {
	return {
		from,
		text,
		generateAt: new Date().getTime()
	}
}


module.exports = {generateMessage}