import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import '../App.css'

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

    render() {
        var patientComponents = [];
        for(var i = 0; i < this.state.patients.length; i++){
            patientComponents.push(
                <Container key={this.state.patients[i].id} className="chart shadow" style={{height: '150px'}}>  
                    <Row>
                        <Col>         
                            <b>Patient Name: </b>
                            {this.state.patients[i]["fname"]} {this.state.patients[i]["lname"]}
                            <br />
                            <b>D.O.B.:</b>
                            <br />
                            {this.state.patients[i]["birth"]}
                            <br />
                            <b>Patient Address:</b>
                            <br />
                            {this.state.patients[i]["address"]}
                        </Col>
                        <div >
                            <br/><br/><br/>
                            <Button variant="primary" as={Link} to={`/Patient/${ this.state.patients[i].id }`}>View</Button>
                        </div>
                    </Row>
                </Container>);
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
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    {patientComponents}
                </Container>
            </React.Fragment>
        )
    }
}