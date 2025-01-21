import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Make sure this path is correct
import LoginForm from './components/LoginForm'; // A simple login page component

const App = () => {
  return (
    <Routes>
      {/* Main Route */}
      <Route path="/" element={<Home />} />
      
      {/* Login Route */}
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;