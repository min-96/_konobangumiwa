import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Organism/Home';
import User from './components/Organism/User';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
