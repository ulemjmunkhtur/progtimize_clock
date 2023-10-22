import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvents';
import ShowEvent from './pages/ShowEvent';
import EditEvent from './pages/EditEvent';
import DeleteEvent from './pages/DeleteEvent';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events/create' element={<CreateEvent />} />
      <Route path='/events/details/:id' element={<ShowEvent />} />
      <Route path='/events/edit/:id' element={<EditEvent />} />
      <Route path='/events/delete/:id' element={<DeleteEvent />} />
    </Routes>
  );
};

export default App;
