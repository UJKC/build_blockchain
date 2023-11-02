function Blockchain() {
    this.chain = [];
    this.newTrasactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        trasactions: this.newTrasactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };

    this.newTrasactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

module.exports = Blockchain;