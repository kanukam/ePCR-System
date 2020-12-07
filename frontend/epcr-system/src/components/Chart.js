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
            contentSpacing: '0 0 0 150px',
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        const {step} = this.state;
        const { no, date, type, patient } = this.state;
        const values = { no, date, type, patient };
        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    chart={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />

                {/* Form */}
                <Container  className="main-content" style={{padding: this.state.contentSpacing}}>              
                    <Container className="chart">
                        <ChartForm />
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}