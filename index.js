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

// add multiple data to db
async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const foods = database.collection("users");

        // create an array of documents to insert
        const docs = [
            { name: 'Mamun Prayash', email: "mamun@gmail.com", phone: '0122222222' },
            { name: 'Niladri Shuvo', email: "shuvo@gmail.com", phone: '0188888888' },
            { name: 'Tithi Mukharjee', email: "tithi@gmail.com", phone: '015555555' },
        ];

        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await foods.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("running my CRUD server")
})

app.listen(port, () => {
    console.log('running', port)
})