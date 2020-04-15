import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './components/Signin'
import Register from './components/Register'
import Dashboard from './components/Dashboard/Dashboard';
import HomePage from './components/Dashboard/HomePage';
import Faculty from './components/Dashboard/Faculty';



import './App.css';

function App() {
  return (
    <div>
      <Router>

        <Route 
          exact={true}
          path="/"
          component={Login} 
          />
          
          <Route 
          path="/register"
          component={Register} 
          />

          <Route 
          path="/dashboard"
          component={Dashboard} 
          />

        <Route 
          path="/home"
          component={HomePage} 
          />

        <Route 
          path="/faculty"
          component={Faculty} 
          />
        
          
      </Router>
    </div>
  );
}

export default App;
