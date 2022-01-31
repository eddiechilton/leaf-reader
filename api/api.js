const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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
    let alreadyExists = await conn.collection('teas').findOne({'_id': new ObjectId(obj._id), 'reviews.user':obj2.user})
    if (alreadyExists) {
        return 'error'
    } else {
        let teas = await conn.collection('teas').updateOne({'_id': new ObjectId(obj._id)}, { $push: {"reviews": obj2}})
        return teas
    }
}
async function updateReview(reqBody) {
    console.log(reqBody)
    let obj = reqBody.tea;
    let obj2 = reqBody.newComment;
    let obj3 = reqBody.newRating;
    let teas = await conn.collection('teas').updateOne({'_id': new ObjectId(obj._id), 'reviews.user':obj.selectedReview.user}, { $set: {'reviews.$.comments': obj2, 'reviews.$.rating': obj3}})
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
        let data = await addReview(req.body)
        if (data == 'error'){
        return res.status(400).send({
            message: 'This is an error!'
         });} else {
             res.send(data)
         }
    } else {
        res.send("Mongo isn't connected")
    }
})
app.post('/teas/updateReview', async (req, res) => {
    if (isConnected) {
        let data = await updateReview(req.body)
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
app.get('/teas/kill', async (req, res) => {
    if (isConnected) {
        let data = await conn.collection('teas').deleteMany({})
        res.send(data)
    } else {
        res.send("Mongo isn't connected")
    }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})