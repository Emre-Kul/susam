const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './examples/')));
app.use(express.static(path.join(__dirname, './assets/')));

app.listen(process.env.PORT || 3333, () => {});
