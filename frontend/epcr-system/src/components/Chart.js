import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import ChartForm from './ChartForm'
import MainNav from './MainNav'
import '../App.css'

export default class Chart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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

    render() {
        const {step} = this.state;
        const { no, date, type, patient } = this.state;
        const values = { no, date, type, patient };
        return (
            <React.Fragment>
                <MainNav username={this.state.username} chart={true}/>

                {/* Form */}
                <Container  className="main-content">              
                    <Container className="chart">
                        <ChartForm />
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}
