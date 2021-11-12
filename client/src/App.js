import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import './App.css';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <div className="App">
      <AlertState>
        <AuthState>
          <ContactState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container mt-4">

                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </ContactState>
        </AuthState>
      </AlertState>
    </div>
  );
}

export default App;
