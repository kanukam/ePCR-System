import './App.css';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import React from 'react';
import {MainContext} from './Auth';
import Chart from './components/Chart'
import Login from "./views/Login";
import Reset from "./views/Reset";
import Register from './components/Register'
import Dashboard from "./views/Dashboard";
import ViewChart from "./components/ViewChart";
import ViewCharts from './components/ViewCharts';
import SummaryReport from "./components/SummaryReport";
import TrendCall from "./components/TrendCall";
import ChangePassword from './components/ChangePassword';
import Settings from './views/Settings';
import Statistics from './views/Statistics';
import {ProtectedRoute, ProtectedLogin} from "./Routes";
import i18next from 'i18next';
import {withTranslation} from 'react-i18next'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      username: "",
      privilege: "",
      setPrivilege: this.setPrivilege,
      setAuth: this.setAuth,
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

  setPrivilege = value => {
    this.setState({ privilege: value });
  }

  setUsername = value => {
    this.setState({ username: value });
  };

  setLanguage = value => {
    this.setState({language: value});
    i18next.changeLanguage(value);
  }

  getLanguage(username){
    //get request for users preferred language from db
    this.setLanguage('es');
  }

  jwtCookie() {
    const url = 'http://localhost:3000/api/test-auth';
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
        this.setAuth(true);
      }
    }).catch((error) => {
      this.setAuth(true);
    })
  }

  getUsername() {
    const url = 'http://localhost:3000/api/getUsername';
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
        const { username, privilege} = data
        this.setUsername(username);
        this.setPrivilege(privilege);
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
            <ProtectedLogin exact path="/" auth={this.state.auth} getUsername={this.getUsername} component={Login}/>
            <ProtectedRoute exact path="/Dashboard" auth={this.state.auth} component={Dashboard} />
            <ProtectedRoute exact path="/Chart" auth={this.state.auth} component={Chart} />
            <ProtectedRoute exact path="/ViewCharts" auth={this.state.auth} component={ViewCharts} />
            <ProtectedRoute exact path="/ViewChart/:id" auth={this.state.auth} component={ViewChart} />
            <ProtectedRoute exact path="/SummaryReport" auth={this.state.auth} component={SummaryReport} />
            <ProtectedRoute exact path="/Settings" jwtCookie={this.jwtCookie} auth={this.state.auth} component={Settings} />
            <ProtectedRoute exact path="/Statistics" jwtCookie={this.jwtCookie} auth={this.state.auth} component={Statistics} />
            <ProtectedRoute exact path="/TrendCall" auth={this.state.auth} component={TrendCall} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Reset" component={Reset} />
            <Route exact path="/Reset/:token" component={ChangePassword} />
          </Switch>
        </BrowserRouter>
      </MainContext.Provider>
    )
  }
}

export default withTranslation()(App);
