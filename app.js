const express = require("express")
const path = require('path');
const app = express();
const Database = require('./model.js')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/userdata').then(()=>{
//     console.log("Database connected Successfully")
// }).catch((err)=>{
//     console.log("Got an error and Error is ",err)
// })

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://new_user_vedant:Password123@cluster0.9xidsa1.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const mydb = await client.db("userdata").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error){
console.log("Got an Error: ",error)
  }
}



run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.get('/', (req,res)=>{
    console.log("You are on homepage")
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.post("/postdata", async (req,res)=>{
  const mydb = await client.db("userdata")
  const mycoll = mydb.collection("userdataentry")
    console.log(req.body)
    const user_name = req.body.name;
    const user_mobile  = req.body.mobile;
    const user_subject = req.body.subject;
    const user_message = req.body.message;
    const user_email = req.body.email;
    const newdata = new Database({
        user_name,
        user_mobile,
        user_subject,
        user_message,
        user_email
    })
    await mycoll.insertOne(newdata).then(()=>{
        console.log("Data Stored Successfully.")
    }).catch((err)=>{
        console.log("Got an error ", err)
    });
    res.sendFile(path.join(__dirname,'../front-end/submitted.html'))
})

app.listen(8080,()=>{
    console.log("you are at 8080 port")
})

// mongosh "mongodb+srv://cluster0.9xidsa1.mongodb.net" --apiVersion 1 --username <username>