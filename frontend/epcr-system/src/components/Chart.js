import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import ChartForm from './ChartForm'
import '../App.css'
import '../Sidebar.css'
import Dashboard from '../views/Dashboard'

export default class Chart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            sidebarSpacing: '0 0 0 10vw',
            sidebarHide: true,
            showAdd: false
        };
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount(){
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
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({username: data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleAdd() {
        this.setState({
            showAdd: true
        });
    }

    toggleSidebar = (event=> {
        console.log('toggle');
        this.setState({sidebarSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 10vw')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    });

    render() {
        const {step} = this.state;
        const { no, date, type, patient } = this.state;
        const values = { no, date, type, patient };
        return (
            <Dashboard>
                {/* Form */}
                <Container className="chart">
                    <ChartForm />
                </Container>
            </Dashboard>
        )
    }
}
