const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const previousBlockHash = 'UjwalUdai'

const currentBlockData = [
    {
        amount: 100,
        sender: 'ujwal',
        recipient: 'udai',
    },
    {
        amount: 1000,
        sender: 'udai',
        recipient: 'ujwal',
    },
]

console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));