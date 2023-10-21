const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    start: {
        type: Number, 
        required: true
    }, 
    end:{
        type: Number, 
        required: true
    }
})

const EventModel = mongoose.model("events", EventSchema)
module.exports = EventModel; 
