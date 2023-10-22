// server.js
const express = require('express');
const mongoose = require('mongoose')
// const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const EventModel = require('./models/Events')

const app = express();
app.use(cors())
app.use(express.json())

// Set up MongoDB connection 
mongoose.connect(
    "mongodb+srv://client:00000@data.qyp2klj.mongodb.net/Data?retryWrites=true&w=majority"
)

//getting data from mongodb
app.get("/getEvents", (req, res) =>{
    EventModel.find({}).then(function(events){
        res.json(events)
    }).catch(function(err){
        res.json(err)
    })
})

//posting data to mongodb 
app.post("/createEvent", async (req, res)=> {
    const events = req.body; 
    const newEvent = new EventModel(events);
    await newEvent.save(); 
    res.json(events); 
})

//deleting data from mongodb
app.delete("/deleteEvent/:name", async (req, res) => {
    const eventName = req.params.name;
    const deletedEvent = await EventModel.findOneAndDelete({ name: eventName });
    if (deletedEvent) {
        res.status(200).json({ status: "Ok", data: "Deleted" });
    } else {
        res.status(404).json({ status: "Error", message: "Event not found" });
    }

});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});





// // Set up MongoDB connection
// const url = "mongodb+srv://client:00000@data.qyp2klj.mongodb.net/Data?retryWrites=true&w=majority";
// const client = new MongoClient(url);



// try {
//     client.connect();
//     console.log('Connected to MongoDB');
// } catch(e){
//     console.error('Error connecting to MongoDB', e);
// }




// app.get("/events", async (req, res) => {
//     const db = client.db("Data");
//     const EventCollection = db.collection("events");
//     const results = EventCollection.find({}).limit(50).toArray();
//     res.send(results).status(200);
// });
