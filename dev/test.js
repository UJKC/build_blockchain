const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(21190, 'Hi', 'ujwal')

bitcoin.createNewTransaction(69, 'Udai', 'Ujwal')

bitcoin.createNewBlock(113, 'Hi', 'udai')

console.log(bitcoin)