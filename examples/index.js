const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../assets')));
app.listen(process.env.PORT || 3333, () => {
 app.get('/', function (req, res) {
  res.send('hello world')
 });
});
