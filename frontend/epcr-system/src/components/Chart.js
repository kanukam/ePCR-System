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
            showAdd: false
        };
        this.handleAdd = this.handleAdd.bind(this);
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
                <MainNav username={this.context.username} chart={true}/>

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
