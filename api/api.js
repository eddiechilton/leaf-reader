const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://mongodb";
var isConnected = false;
var conn;

async function connectToMongodb() {
        await MongoClient.connect(uri, {useNewUrlParser: true},(err, client) => {
            if (err) { console.log(err) }
            else {
                isConnected = true
                conn = client.db('tea')
                conn.createCollection('teas', { strict: true }, (err, results) => {
                    if (err) { console.log('teas collection exists'); }
                    else { 
                        console.log('teas collection created!'); 
                    }
                });
            }
            }
        )
}

async function getATea() {
    let teas = await conn.collection('teas').findOne({})
    return teas
}
async function addTea() {
    let teas = await conn.collection('teas').insertOne({name:'eddie',tea:'puerh'})
    return teas
}

connectToMongodb();
app.get('/', async (req, res) => {
    if (isConnected) {
        await addTea()
        let data = await getATea()
        console.log(data)
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})