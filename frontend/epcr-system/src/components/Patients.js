import 'date-fns';
import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
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
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.search = this.search.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    componentDidMount() {
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
                this.setState({patients: data['patients']});
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

    render() {
        let searchPadding = '5px 0 5px ' + this.state.contentSpacing.slice(6);
        let patientComponents = [];
        for(let i = 0; i < this.state.patients.length; i++){
            patientComponents.push(
                <Container key={this.state.patients[i].id} className='chart shadow'>  
                    <Row>
                        <Col>         
                            <b>Patient Name: </b>
                            {this.state.patients[i]["fname"]} {this.state.patients[i]["lname"]}
                            <br />
                            <b>D.O.B.: </b>
                            {this.state.patients[i]["birth"]}
                            <br /><br />
                            <b>Patient Address: </b>
                            {this.state.patients[i]["address"]}
                            <br />
                            <b>Patient Phone: </b>
                            {this.state.patients[i]["phone"]}
                            <br />
                            {this.state.patients[i]["history"]}
                        </Col>
                        <div >
                            <br/><br/><br/>
                            <Button variant="primary" as={Link} to={`/Patient/${ this.state.patients[i].id }`}>View</Button>
                        </div>
                    </Row>
                </Container>
            );
        }
        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    patient={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <div style={{padding: searchPadding, backgroundColor: '#EFEFEF', display: 'flex', justifyContent: 'center'}}> 
                    <form onSubmit={this.search}>      
                        <TextField 
                            id="firstname" 
                            size="small"
                            label="First Name" 
                            type="search" 
                            style={{maxWidth: '50%'}}
                            onChange={this.searchChange('firstname')} 
                        />
                        &nbsp;
                        <TextField 
                            id="lastname" 
                            size="small" 
                            label="Last Name" 
                            type="search" 
                            style={{maxWidth: '50%'}}
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
                    {patientComponents}
                </Container>
            </React.Fragment>
        )
    }
}