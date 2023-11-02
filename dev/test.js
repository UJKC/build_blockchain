const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(21190, 'Hi', 'ujwal')

console.log(bitcoin)