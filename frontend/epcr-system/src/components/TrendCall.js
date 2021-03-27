import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import MainNav from '../components/MainNav';
import { MainContext } from '../Auth';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import moment from 'moment'

export default class TrendCall extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            message: "",
            summary: "",
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const{from, to} = this.props.history.location.state;
        if(from && to){
            // Get summary report data back from server
            const url = `http://localhost:3000/charts/summary`;
            const options = {
                method: 'POST',
                body: JSON.stringify({ from, to }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
            // Post request to get summary data
            fetch(url, options).then(response => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                return response.json()
                })
                .then(data => {
                    this.setState({ summary: data["data"], });
                    console.log(this.state.summary);
                })
                .catch((error) => {
                    this.setState({ message: this.context.translate('error') });
                })
        }
        else {
            this.setState({ message: this.context.translate('error') });
        }
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    saveAsPdf = (event) => {
        event.preventDefault();
        window.print();
    }

    render() {
        const { from, to } = this.props.history.location.state;
        if(this.state.message){
            return(
                <React.Fragment id="summary">
                    <MainNav
                        username={this.context.username}
                        statistics={true}
                        sidebarHide={this.state.sidebarHide}
                        contentSpacing={this.state.contentSpacing}
                        toggleCollapse={this.toggleCollapse}
                    />
                    <Container className="mt-5 main-content" style={{ padding: this.state.contentSpacing }}>
                        <h1>{this.context.translate("error")}</h1>
                    </Container>
                </React.Fragment>
            )
        }
        else if(this.state.summary){
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
                            <h3 className="text-center">{moment(from).format("DD/MM/YYYY")} - {moment(to).format("DD/MM/YYYY") }</h3>
                        </Container>
                    </React.Fragment>
                )
        }
        else{
            return null;
        }
    }
}