import React from 'react';
import logo from './logo.svg';
import './style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile from './containers/Profile';
import Home from './containers/Home';

import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/profile/:id" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
