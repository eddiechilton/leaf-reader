const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(cors())
app.use(express.json());
var isConnected = false;
var conn;

async function connectToMongodb() {
        await MongoClient.connect("mongodb://mongodb", {useNewUrlParser: true},(err, client) => {
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

async function getLastFive() {
    let teas = await conn.collection('teas').find({}).limit(5).toArray()
    return teas
}
async function getMyTeas(reqBody) {
    let teas = await conn.collection('teas').find({user: reqBody.user}).toArray()
    return teas
}
async function addTea(reqBody) {
    console.log(2,reqBody)
    let teas = await conn.collection('teas').insertOne(
        {
            user:reqBody.user,
            tea:reqBody.tea,
            rating:reqBody.rating,
            comments:reqBody.comments
        })
    return teas
}

connectToMongodb();

app.get('/lastFive', async (req, res) => {
    if (isConnected) {
        let data = await getLastFive()
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})
app.get('/user/:username/myTeas', async (req, res) => {
    if (isConnected) {
        let data = await getMyTeas(req.params.username)
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})
app.post('/newTea', async (req, res) => {
    if (isConnected) {
        let reqBody = req.body
        console.log(1,reqBody)
        let data = await addTea(reqBody)
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})