const express = require('express');
const fs = require('fs');
const { exists } = require('fs');
const fsPromises = require('fs').promises;
const cors = require('cors');
const app = express();
// var https = require('https')

const txId = 0;
const transactions = { txs: [] };

app.use(cors())
app.use(express.json());

app.post('/api/addTransaction', async (req, res) => {
    try {
        console.log(req.body)
        transactions.txs.push(req.body);
        txId++;
        res.status(201).send(txId);
    } catch (err) {
         res.status(400).send("erreur")
    }  
});
   

app.post('/api/updateSingleTransaction/:id', (req, res) => {
    const id = req.params.id;
    const sign = req.body.sign;
    try {
        let newTransactions =  transactions.txs.map((tx) => {
                if (tx.txId == id && !tx.signatures.includes(sign)) tx.signatures.push(sign);
                return tx;
            });
        transactions = newTransactions;
        res.status(200).send({ transactions })
    } catch (err) {
        console.log("erreur in finding transaction id", err)
        res.status(404).send({ message: "not find" })
    }
});

app.get('/api/txId', async (req, res) => {
    try {
        res.status(200).send({ txId })
    } catch (err) {
        console.log("erreur in catch readfile", err)
        res.status(404).send({ message: "not find" })
    }
});

app.get('/api/singleTransaction/:id', async (req, res) => {
    try { 
        const id = req.params.id;
        let transaction = await content.txs.filter(function (tx) {
                return tx.txId == id;
            });
            res.status(200).send(transaction)
    } catch (err) {
        console.log("erreur in finding transaction id", err)
        res.status(404).send({ message: "not find" })
    }
});
    

app.get('/api/deleteTx/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let newTransactions = await content.txs.filter(function (tx) {
                return tx.txId != id;
            });
        transactions = newTransactions;
        res.status(200).send(transactions);
    } catch (err) {
            console.log("erreur in finding transaction id", err)
            res.status(404).send({ message: "not find" })
    }
});

app.get('/api/transactions', async (req, res) => {
        try {
            res.status(200).send({ transactions })
        } catch (err) {
            console.log("erreur in get all txs", err)
            res.status(404).send({ message: "no txs found" })
        }
});

const port = (process.env.PORT || 33550)

app.listen(port, () => {
    console.log("Server is runing on port : ", port)
})

// if(fs.existsSync('server.key')&&fs.existsSync('server.cert')){
//     console.log("am i here")
//     https.createServer({
//       key: fs.readFileSync('server.key'),
//       cert: fs.readFileSync('server.cert')
//     }, app).listen(49832, () => {
//       console.log('HTTPS Listening: 49832')
//     })
//   }else{
//     console.log("OR  here")
//     var server = app.listen(49832, function () {
//         console.log("HTTP Listening on port:", server.address().port);
//     });
//   }