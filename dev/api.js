const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const Blockchain = require('./blockchain')

const bitcoin = new Blockchain();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hi listening already dw.");
});

app.get('/blockchain', (req, res) => {
    res.send(bitcoin);
});

app.post('/transaction', (req, res) => {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added in a block ${blockIndex} .`})
});

app.get('/mine', (req, res) => {
    const lastBlock = bitcoin.
    const newBlock = bitcoin.createNewBlock()
    res.send("Hi listening already dw.");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});