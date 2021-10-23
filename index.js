const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());

// user: mydbuser1
// pass: tDRBNUDXNkdyXQ4G


// add one data to database
const uri = "mongodb+srv://mydbuser1:tDRBNUDXNkdyXQ4G@cluster0.iea9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('foodMaster');
        const usersCollection = database.collection('users');

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })


        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body
            const result = await usersCollection.insertOne(newUser)
            console.log('hitting the post', req.body)
            console.log('added user', result)
            res.json(result)
        });
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("running my CRUD server")
})

app.listen(port, () => {
    console.log('running', port)
})