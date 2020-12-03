import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import '../App.css'

export default class Patient extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
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

    viewCharts() {
        const url = 'http://localhost:3000/charts/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options).then((response) => {
            if (!response.ok) {
                throw Error;
            }
        })
        
    }

    render() {
        return (
            <React.Fragment>
                <MainNav username={this.state.username} patient={true}/>

                {/* Form */}  
                <Container style={{padding: '0 0 0 150px'}}>             
                    Note: This page should render existing charts made by user, viewChart function should be used somewhere
                    
                </Container>
            </React.Fragment>
        )
    }
}