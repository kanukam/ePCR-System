import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import MainNav from '../components/MainNav';
import CallChart from '../components/CallChart';
import { MainContext } from '../Auth';
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
            message: null,
            summary: "",
            day: "",
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const{from, to} = this.props.history.location.state;
        if(from && to){
            // Get summary report data back from server
            const url = `http://localhost:3000/charts/calls`;
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
                    this.setState({ calls: data["data"], });
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
        if(this.state.message){
            return(
                <React.Fragment>
                    <MainNav
                        username={this.context.username}
                        statistics={true}
                        sidebarHide={this.state.sidebarHide}
                        contentSpacing={this.state.contentSpacing}
                        toggleCollapse={this.toggleCollapse}
                    />
                    <Container className="mt-5 main-content" style={{ padding: this.state.contentSpacing }}>
                        <h1>{this.state.message}</h1>
                    </Container>
                </React.Fragment>
            )
        }
        else if(this.state.calls){
            const { from, to } = this.props.history.location.state;
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
                            <Form className="mb-5">
                                <Row>
                                    <Col xs={6} className="offset-3">
                                        <Form.Control as="select" onChange={e => this.setState({ day: e.target.value })} value={this.state.day}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value={0}>{this.context.translate('sunday')}</option>
                                            <option value={1}>{this.context.translate('monday')}</option>
                                            <option value={2}>{this.context.translate('tuesday')}</option>
                                            <option value={3}>{this.context.translate('wednesday')}</option>
                                            <option value={4}>{this.context.translate('thursday')}</option>
                                            <option value={5}>{this.context.translate('friday')}</option>
                                            <option value={6}>{this.context.translate('saturday')}</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form>
                            {this.state.day && <CallChart day={this.state.day} dates={this.state.calls}/>}
                        </Container>
                    </React.Fragment>
                )
        }
        else{
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
}