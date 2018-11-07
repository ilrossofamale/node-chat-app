const path = require('path');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const exp = require('express');


var app = exp();
app.use(exp.static(publicPath));

app.listen(port, () => {
	console.log(`Avviata sulla porta ${port}`);
});


module.exports = {app};