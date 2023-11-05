const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const Blockchain = require('./blockchain');

const uuid = require('uuid');

const nodeAddress = uuid.v1().split('-').join("");

const bitcoin = new Blockchain();

// Make it access package.json start file
const port = process.argv[2]

const rp = require('request-promise');

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

app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = new req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    const registerNodePromises = [];
    bitcoin.networkNodes.forEach(newNodeUrl => {
        const requestOption = {
            uri: newNodeUrl + '/register-node',
            method: 'POST',
            body: { 
                newNodeUrl: newNodeUrl,
                json: true
            }
        };
        registerNodePromises.push(rp(requestOption));
    });
    Promise.all(registerNodePromises)
    .then(data => {
        const bulkRegisterOption = {
            uri: newNodeUrl + '/register-node-bulk',
            method: 'POST',
            body: {
                allNetworkNodes: [ bitcoin.networkNodes, bitcoin.currentNodeUrl]
            },
            json: true
        };
        return rp(bulkRegisterOption);
    })
    .then(data => {
        res.json({
            message: "New node registered"
        });
    })
});

/*
In the provided code:

```javascript
bitcoin.networkNodes.forEach(newNodeUrl => {
    const requestOption = {
        uri: newNodeUrl + '/register-node',
        method: 'POST',
        body: { 
            newNodeUrl: newNodeUrl,
            json: true
        }
    };
    registerNodePromises.push(rp(requestOption));
});
```

`newNodeUrl` is a variable that represents each element (URL) in the `bitcoin.networkNodes` array. This loop iterates through each element in the `bitcoin.networkNodes` array, and for each element (URL), it creates a `requestOption` object.

Here's what happens inside the loop:

- `newNodeUrl` represents an element (a URL) from the `bitcoin.networkNodes` array for each iteration.
- The `requestOption` object is constructed with properties specific to that `newNodeUrl`. It contains the URL (`uri`) for the specific node's registration endpoint, which is formed by appending `/register-node` to the `newNodeUrl`.
- The `body` property of the `requestOption` object is an object containing the `newNodeUrl` that corresponds to the current node, and `json: true` indicates that the body should be sent as JSON.

In summary, `newNodeUrl` is a variable representing the URL of each node in the `bitcoin.networkNodes` array, and for each node, a separate request is constructed with its unique URL to send a registration request. The loop processes all nodes in the `bitcoin.networkNodes` array, creating a separate request for each.

Sure, I'll explain the code block you provided step by step:

1. **Endpoint Definition**:
   - This code block defines an HTTP POST endpoint at `/register-and-broadcast-node`. This endpoint is where a new node will register with the existing nodes in the network.

2. **New Node URL Extraction**:
   - The `newNodeUrl` is extracted from the request body using `req.body.newNodeUrl`. This assumes that the incoming request contains a JSON body with a `newNodeUrl` property.

3. **Network Node Registration**:
   - It checks if the `newNodeUrl` is not already in the `bitcoin.networkNodes` array. This array is used to keep track of all nodes in the network.
   - If the `newNodeUrl` is not found in the array (i.e., its index is -1), it adds the `newNodeUrl` to the `bitcoin.networkNodes` array. This step registers the new node locally in this node's list of network nodes.

4. **Registering the New Node with Other Nodes**:
   - It creates an array called `registerNodePromises` to store promises returned by asynchronous HTTP requests to register the new node with the existing nodes in the network.
   - It iterates over the `bitcoin.networkNodes` array (which should now include the newly added node) and makes a POST request to each existing node.
   - For each existing node, it constructs the request options using the `rp` library (assuming `rp` is `request-promise`).
   - The request options include:
     - The URI, which is the URL of the existing node plus `/register-node`. This endpoint is expected to handle the registration process on the receiving node.
     - The HTTP method is set to POST.
     - The request body contains the `newNodeUrl` property, and `json: true` is specified to indicate that the body should be sent as JSON.

5. **Promise.all**:
   - It uses `Promise.all` to wait for all registration requests to complete. The `registerNodePromises` array contains promises for all registration requests.
   - When all promises are resolved, the `then` block is executed. However, in the provided code, the `then` block is empty (`then(data => { })`). You would typically handle the responses from the other nodes in this block, which may involve synchronization, validation, or other blockchain-related tasks.

This code block is part of a blockchain network and is responsible for registering a new node with the existing nodes in the network, facilitating the decentralization of the blockchain. The new node is added to the local node's list of network nodes, and registration requests are sent to the existing nodes to let them know about the new addition. The actual logic for processing these requests and updating the network state would be implemented in the `/register-node` endpoint on each existing node.
*/

app.post('/register-node', (req, res) => {
    const newNodeUrl = new req.body.newNodeUrl;
    const notCurrntURl = bitcoin.currentNodeUrl !== newNodeUrl;
    if ( (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) && notCurrntURl ) {
        bitcoin.networkNodes.push(newNodeUrl);
        res.json({
            message: "New Network registered"
        });
    }
});

app.post('/register-node-bulk', (req, res) => {
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});