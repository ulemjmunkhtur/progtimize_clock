// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Set up MongoDB connection
const url = "mongodb+srv://client:00000@data.qyp2klj.mongodb.net/Data?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });

app.use(express.json());


// Endpoint to retrieve tasks from the database
app.get('/tasks', (req, res) => {
    client.connect((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database connection error' });
            return;
        }

        const db = client.db('Data');
        const tasksCollection = db.collection('events');

        tasksCollection.find({}).toArray((queryErr, tasks) => {
            if (queryErr) {
                console.error(queryErr);
                res.status(500).json({ error: 'Task retrieval error' });
            } else {
                res.status(200).json(tasks);
            }
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
