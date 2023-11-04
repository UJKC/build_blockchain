const express = require('express');

const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hi listening already dw.");
});

app.get('/blockchain', (req, res) => {
    res.send("Hi listening already dw.");
});

app.post('/transaction', (req, res) => {
    console.log(req.body);
    res.send(`Hi, listening already, and the amount is ${req.body.amount} amount.`);
});

app.get('/mine', (req, res) => {
    res.send("Hi listening already dw.");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});