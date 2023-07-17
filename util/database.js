require('dotenv').config()
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb+srv://trishabiswas:4EuE1mnlI4LYwau8@cluster1.wbgmmxq.mongodb.net/?retryWrites=true&w=majority";


const mongoConnect = (callback) => {
    MongoClient.connect(connectionURL).
        then(result => {
            console.log('connected');
            callback(result)
        })
        .catch(err => console.log(err));
}

module.exports = mongoConnect;