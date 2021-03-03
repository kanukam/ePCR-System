import './App.css';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import React from 'react';
import {MainContext} from './Auth';
import Chart from './components/Chart'
import Login from "./views/Login";
import Register from './components/Register'
import Dashboard from "./views/Dashboard";
import Patient from "./components/Patient";
import Patients from './components/Patients';
import Settings from './views/Settings';
import {ProtectedRoute, ProtectedLogin} from "./Routes";
import i18next from 'i18next';
import {withTranslation} from 'react-i18next'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      username: "",
      id: "",
      setAuth: this.setAuth,
      setId: this.setId,
      setUsername: this.setUsername,
      setLanguage: this.setLanguage,
      language: "",
      translate: this.props.t
    }
    this.jwtCookie = this.jwtCookie.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
  }

  setAuth = value => {
    this.setState({ auth: value });
  };

  setUsername = value => {
    this.setState({ username: value });
  };

  setLanguage = value => {
    this.setState({language: value});
    i18next.changeLanguage(value);
  }

  setId = id => {
    this.setState({ id: id });
  }

  getLanguage(username){
    //get request for users preferred language from db
    this.setLanguage('es');
  }

  jwtCookie() {
    const url = 'http://localhost:3000/test-auth';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    fetch(url, options).then((response) => {
      if (!response.ok) {
        throw Error("Failed");
      }
      if (response.ok) {
        console.log("Success");
        this.setAuth(true);
      }
    }).catch((error) => {

    })
  }

  getUsername() {
    const url = 'http://localhost:3000/getUsername';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    fetch(url, options)
      .then((response) => {
        if (response.ok)
          return response.json();
        else
          throw Error("Failed");
      })
      .then((data) => {
        const {username, id} = data
        this.setUsername(username);
        this.setId(id);
      })
      .catch((error) => {
        
      });
  }

  componentDidMount(){
    // Check if user has jwt cookie on application startup
    this.jwtCookie();
    this.getUsername();
    this.getLanguage();
  }

  // Components go in Protected routes
  render() {
    return (
      <MainContext.Provider value={this.state}>
        <BrowserRouter>
          <Switch>
            <ProtectedLogin exact path="/" auth={this.state.auth} component={Login}/>
            <ProtectedRoute exact path="/Dashboard" auth={this.state.auth} component={Dashboard} />
            <ProtectedRoute exact path="/Chart" auth={this.state.auth} component={Chart} />
            <ProtectedRoute exact path="/Patients" auth={this.state.auth} component={Patients} />
            <ProtectedRoute exact path="/Patient/:id" auth={this.state.auth} component={Patient} />
            <ProtectedRoute exact path="/Settings" auth={this.state.auth} component={Settings} />
            <Route exact path="/Register" component={Register} />
          </Switch>
        </BrowserRouter>
      </MainContext.Provider>
    )
  }
}

export default withTranslation()(App);
