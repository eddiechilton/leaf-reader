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

async function getAllTeas() {
    let teas = await conn.collection('teas').find({}).toArray()
    return teas
}
async function getMyTeas(username) {
    let teas = await conn.collection('teas').find({"reviews.user": username}).toArray()
    return teas
}
async function addTea(reqBody) {
    let obj = {...reqBody}
    console.log(3,obj)
    let teas = await conn.collection('teas').insertOne(obj)
    return teas
}
async function addReview(reqBody) {
    let obj = reqBody.tea;
    let obj2 = reqBody.review;
    let teas = await conn.collection('teas').update(obj, { $push: {"reviews":obj2}})
    return teas
}

connectToMongodb();

app.get('/teas/getAllTeas', async (req, res) => {
    if (isConnected) {
        let data = await getAllTeas()
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})
app.post('/teas/addReview', async (req, res) => {
    if (isConnected) {
        console.log(req.body)
        let data = await addReview(req.body)
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})
app.post('/teas/newTea', async (req, res) => {
    if (isConnected) {
        let data = await addTea(req.body)
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

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})