const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient } = require('mongodb');

// user: mydbuser1
// pass: tDRBNUDXNkdyXQ4G


// add one data to database
const uri = "mongodb+srv://mydbuser1:tDRBNUDXNkdyXQ4G@cluster0.iea9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("foodMaster").collection("users");
    // perform actions on the collection object
    console.log("hitting db");

    const user = { name: 'Opu Biswas', email: "opu@gmail.com", phone: '0188888888' };
    collection.insertOne(user)
        .then(() => {
            console.log('insert success');
        })

    // client.close();
});


app.get('/', (req, res) => {
    res.send("running my CRUD server")
})

app.listen(port, () => {
    console.log('running', port)
})