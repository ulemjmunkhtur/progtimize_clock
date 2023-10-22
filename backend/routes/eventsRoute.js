import express from 'express';
import { Event } from '../models/eventModel.js';

const router = express.Router();

// Route for Save a new Event
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.start ||
      !request.body.end
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, start, end',
      });
    }
    const newEvent = {
      name: request.body.name,
      start: request.body.start,
      end: request.body.end,
    };

    const event = await Event.create(newEvent);

    return response.status(201).send(event);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Eventss from database
router.get('/', async (request, response) => {
  try {
    const events = await Event.find({});

    return response.status(200).json({
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Event from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const event = await Event.findById(id);

    return response.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Event
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.start ||
      !request.body.end
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Event.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Event not found' });
    }

    return response.status(200).send({ message: 'Event updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a event
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Event.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Event not found' });
    }

    return response.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
