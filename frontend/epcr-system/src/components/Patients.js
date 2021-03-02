import 'date-fns';
import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import ChartPreview from './ChartPreview';
import TextField from '@material-ui/core/TextField';
import MatButton from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../App.css';

export default class Patients extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            language: "",
            dob: null
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.search = this.search.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.languageChange = this.languageChange.bind(this);
    }

    componentDidMount() {
        this.setState({language: this.context.language});
        const url = 'http://localhost:3000/patients/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({patients: data['patients'].reverse()});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    search(event){
        event.preventDefault();
        console.log(this.state);
    }

    searchChange = field => event =>{
        this.setState({[field]: event.target.value});
    }

    dateChange = field => date => {
      this.setState({[field]: date});
    };

    languageChange(event) {
        console.log(event.target.value);
        this.setState({language: event.target.value});
        this.context.setLanguage(event.target.value);
    }

    render() {
        let searchPadding = '5px 0 5px ' + this.state.contentSpacing.slice(6);
        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    patient={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <div className="main-content" style={{padding: searchPadding, backgroundColor: '#EFEFEF', display: 'flex', justifyContent: 'center'}}> 
                    <form onSubmit={this.search}>      
                        <TextField 
                            id="firstname" 
                            size="small"
                            label="First Name" 
                            type="search" 
                            style={{width: '100px'}}
                            onChange={this.searchChange('firstname')} 
                        />
                        &nbsp;
                        <TextField 
                            id="lastname" 
                            size="small" 
                            label="Last Name" 
                            type="search" 
                            style={{width: '100px'}}
                            onChange={this.searchChange('lastname')} 
                        />
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dob"
                                label="DOB"
                                value={this.state.dob}
                                onChange={this.dateChange('dob')}
                                style={{maxWidth: '140px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="startdate"
                                label="Start Date"
                                value={this.state.startdate}
                                onChange={this.dateChange('startdate')}
                                style={{maxWidth: '140px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="enddate"
                                label="End Date"
                                value={this.state.enddate}
                                onChange={this.dateChange('enddate')}
                                style={{maxWidth: '140px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <MatButton style={{marginTop: '10px'}} type='submit' color="default">search</MatButton>
                    </form>
                </div>
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    {this.state.patients && this.state.patients.map(({ name, fname, dob, birth, address, phone, history, id }, idx) => {
                        return (
                            <ChartPreview name={name} fname={fname} dob={dob} birth={birth} address={address} phone={phone} history={history} id={id} key={idx}/>
                        )
                    })}
                </Container>
                <select style={{position: 'absolute', bottom: '5px', right: '5px'}} value={this.state.language} onChange={this.languageChange}>
                    <option value='en'>en</option>
                    <option value='es'>es</option>
                </select>
            </React.Fragment>
        )
    }
}