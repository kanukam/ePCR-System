import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainNav from '../components/MainNav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from '../Auth';
import moment from 'moment';

export default class SummaryReport extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            message: "",
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const{from, to} = this.props.history.location.state;
        if(from && to){
            // Get summary report data back from server
        }
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    render() {
        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    statistics={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container className="mt-5 main-content" style={{ padding: this.state.contentSpacing }}>
                    
                </Container>
            </React.Fragment>
        )
    }
}