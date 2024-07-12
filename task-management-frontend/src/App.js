import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import './App.css';
import Dash from './pages/Dash';
import Todo from './pages/Todo';
import Contact from './pages/Contact';

import Sidebar from './components/Sidebar';

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
    <Router>
      <div className="app">
        <div className="main">
          <Sidebar sidebarToggle={sidebarToggle}/>
          <div className="content">
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dash sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
