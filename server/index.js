const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const EventModel = require('./models/Events')

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(
    "mongodb+srv://mk:12345@demo.3apcewz.mongodb.net/Data?retryWrites=true&w=majority"
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

app.listen(818, ()=>{
    console.log("Server is running on port 818")
})
