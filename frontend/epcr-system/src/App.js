import './App.css';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import React from 'react';
import {MainContext} from './Auth';
import Chart from './components/Chart'
import Login from "./views/Login";
import Register from './components/Register'
import Dashboard from "./views/Dashboard";
import Patient from './components/Patient';
import {ProtectedRoute, ProtectedLogin} from "./Routes";


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      username: "",
      setAuth: this.setAuth,
      setUsername: this.setUsername
    }
    this.jwtCookie = this.jwtCookie.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  setAuth = value => {
    this.setState({ auth: value });
  };

  setUsername = value => {
    this.setState({ username: value });
  };

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
      console.log(response);
      if (!response.ok) {
        throw Error("Failed");
      }
      if (response.ok) {
        console.log("Success");
        this.setAuth(true);
      }
    }).catch((error) => {
      console.log("Error");
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
      .then((username) => {
        this.setUsername(username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount(){
    // Check if user has jwt cookie on application startup
    this.jwtCookie();
    this.getUsername();
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
            <ProtectedRoute exact path="/Patient" auth={this.state.auth} component={Patient} />
            <Route exact path="/Register" component={Register} />
          </Switch>
        </BrowserRouter>
      </MainContext.Provider>
    )
  }
}

