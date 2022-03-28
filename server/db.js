const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://xrimir:itssecret@localhost:27017/"
let client = new MongoClient(uri)

module.exports = client