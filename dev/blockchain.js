function Blockchain() {
    this.chain = [];
    this.pendingTrasactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        trasactions: this.pendingTrasactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };

    this.pendingTrasactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
    };

    this.pendingTrasactions.push(newTransaction);

    return this.getLastBlock()['index'] + 1
}








module.exports = Blockchain;