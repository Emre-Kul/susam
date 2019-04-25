const express = require('express');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use(express.static(path.join(__dirname, './examples/')));
app.use(express.static(path.join(__dirname, './bundle/')));

const server = app.listen(process.env.PORT || 3333, () => {
 console.log("Server Started at " + server.address().address + " port : " + server.address().port);
});
