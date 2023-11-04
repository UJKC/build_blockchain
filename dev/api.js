const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const Blockchain = require('./blockchain');

const uuid = require('uuid');

const nodeAddress = uuid.v1().split('-').join("");

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
    res.json({ note: `Transaction will be added in a block ${blockIndex} .`});
});

app.get('/mine', (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: bitcoin.pendingTrasactions,
        index: lastBlock['index'] + 1,
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)
    res.json({
        note: "New Block mined Successfully",
        block: newBlock
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});