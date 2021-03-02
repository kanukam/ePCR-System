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
            filtered: [],
            filter: false,
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            language: "",
            dob: null,
            startdate: null,
            enddate: null,
            firstname: "",
            lastname: "",

        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
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

    searchChange = field => event =>{
        this.setState({[field]: event.target.value});
    }

    dateChange = field => date => {
      this.setState({[field]: date});
    };

    searchPatients = event => {
        event.preventDefault();
        // filter first name
        let filtered = this.state.patients;
        console.log("a");
        if(this.state.firstname){
            filtered = filtered.filter(patient => patient.fname === this.state.firstname);
        }
        // filter last name
        if (this.state.lname) {
            filtered = filtered.filter(patient => patient.lname === this.state.lastname);
        }
        // set filtered bool to true, assign filtered state array
        this.setState({filter: true, filtered: filtered});
        // filter DOB
        // filter start date
        // filter end date
    }

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
                            value={this.state.firstname}
                            onChange={this.searchChange('firstname')} 
                        />
                        &nbsp;
                        <TextField 
                            id="lastname" 
                            size="small" 
                            label="Last Name" 
                            type="search" 
                            style={{width: '100px'}}
                            value={this.state.lastname}
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
                        <MatButton style={{ marginTop: '10px' }} color="default" onClick={this.state.searchPatients}>search</MatButton>
                    </form>
                </div>
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    {this.state.patients && !this.state.filter && this.state.patients.map(({ fname, lname, dob, birth, address, phone, history, id }, idx) => {
                        return (
                            <ChartPreview fname={fname} lname={lname} dob={dob} birth={birth} address={address} phone={phone} history={history} id={id} key={idx}/>
                        )
                    })}

                    {this.state.filtered && this.state.filter && this.state.filtered.map(({ fname, lname, dob, birth, address, phone, history, id }, idx) => {
                        return (
                            <ChartPreview fname={fname} lname={lname} dob={dob} birth={birth} address={address} phone={phone} history={history} id={id} key={idx} />
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