import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import '../App.css'

export default class Notes extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {

    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        console.log(this.state.patient);
        return (
            <React.Fragment>
                <Container className="chart shadow">
                    <h2>Notes:</h2>
                    <Container className="chart shadow">
                        <h4>Note</h4>
                    </Container>
                    <Container className="chart shadow">
                        <h4>Note</h4>
                    </Container>
                    <Container className="chart shadow">
                        <h4>Note</h4>
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}
