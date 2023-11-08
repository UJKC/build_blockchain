const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1699438544170,
    "trasactions": [],
    "nonce": 103292,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1699438575156,
    "trasactions": [
    {
    "amount": 100,
    "sender": "Ujwal",
    "recipient": "Udai",
    "transactionId": "d11e64a07e1f11ee8c326f75b3276596"
    }
    ],
    "nonce": 163336,
    "hash": "0000c1d89c2ff1a6fef1fe02f068d2d6fe8b86747ac6dc16da0b0daddab59aea",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1699438619335,
    "trasactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c6eed1907e1f11ee8c326f75b3276596",
    "transactionId": "d9871a607e1f11ee8c326f75b3276596"
    }
    ],
    "nonce": 39258,
    "hash": "000042e71dbd5a6125a3e6e06a510af284c1b1da1b7fd6f915e8c6a2b3c2dba8",
    "previousBlockHash": "0000c1d89c2ff1a6fef1fe02f068d2d6fe8b86747ac6dc16da0b0daddab59aea"
    }
    ],
    "pendingTrasactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c6eed1907e1f11ee8c326f75b3276596",
    "transactionId": "f3befc907e1f11ee8c326f75b3276596"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }
    
    
    
    
    
    console.log('VALID: ', bitcoin.chainIsValid(bc1.chain));