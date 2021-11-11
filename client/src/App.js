import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/contactState';
import './App.css';

function App() {
  return (
    <div className="App">
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container mt-4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </div>
  );
}

export default App;
