import {useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [events, setEvents] = useState([])
  const [name, setName] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()

// http://localhost:3000/getEvent
// http://localhost:3000/deleteEvent/example 2
// http://localhost:3000/createEvent

  useEffect(()=> {
    axios.get('http://localhost:3000/getEvents')
    .then((events) => {
      console.log(events)
      setEvents(events.data)
    }).catch(err => console.log(err))
  } , [])

  const Submit = () =>{
    axios.post('http://localhost:3000/createEvent', {name, start, end})
    .then((events) => {
      console.log(events)
    }).catch(err => console.log(err))
  }

  const Delete = () =>{
    axios.delete(`http://localhost:3000/deleteEvent/${name}`, {name})
    .then((events)=>{
      console.log(events)
    }).catch(err => console.log(err))
  }

  
  return (
    <div className='center'>
      <h2>First MERN(Mongo, Express, React, Node) App</h2>
      {
        events.map(events => {
          
          // eslint-disable-next-line react/jsx-key
          return <div>
            <h3>{events.name}</h3>
            <h3>{events.start}</h3>
            <h3>{events.end}</h3>
            </div>
        })
      }
      <br />
      <input type="text" onChange={(e) => setName(e.target.value)}/> 
      <input type="text" onChange={(e) => setStart(e.target.value)}/> 
      <input type="text" onChange={(e) => setEnd(e.target.value)}/>
      <button onClick={Submit}>Create Event</button>
      <button onClick={Delete}>Delete Event</button>
    </div>
  )
}

export default App
