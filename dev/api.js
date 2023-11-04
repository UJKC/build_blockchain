var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send("Hi listening already dw.");
});

app.get('/blockchain', (req, res) => {
    res.send("Hi listening already dw.");
});

app.get('/transaction', (req, res) => {
    res.send("Hi listening already dw.");
});

app.get('/mine', (req, res) => {
    res.send("Hi listening already dw.");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});