import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container mt-4">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </div>
  );
}

export default App;
