import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import MainNav from '../components/MainNav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from '../Auth';
import moment from 'moment';
import {withRouter} from 'react-router-dom';

class Statistics extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            fromSummaryDate: null,
            fromSummaryDateDisplay: null,
            toSummaryDate: null,
            toSummaryDateDisplay: null,
            fromCallDate: null,
            fromCallDateDisplay: null,
            toCallDate: null,
            toCallDateDisplay: null,
            message: "",
            trendMessage: ""
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    handleDateNoTime = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = moment(date).format("YYYY-MM-DD");
        this.setState({ [input]: date });
    }

    createSummary = event => {
        event.preventDefault();
        const { fromSummaryDate, toSummaryDate} = this.state;
        if (fromSummaryDate && toSummaryDate){
            this.setState({ message: "" });
            const fromDate = new Date(fromSummaryDate);
            const toDate = new Date(toSummaryDate);
            if(fromDate < toDate){
                // Redirect to page with summary
                this.props.history.push({
                    pathname: '/SummaryReport',
                    state: { from: this.state.fromSummaryDate, to: this.state.toSummaryDate }
                })
            }
            else{
                this.setState({ message: this.context.translate('date-error') });
            }
        }
        else{
            this.setState({ message: this.context.translate('all-fields') });
        }
    }

    trendAnalysis = event => {
        event.preventDefault();
        const { fromCallDate, toCallDate } = this.state;
        if (fromCallDate && toCallDate) {
            this.setState({ trendMessage: "" });
            const fromDate = new Date(fromCallDate);
            const toDate = new Date(toCallDate);
            if (fromDate < toDate) {
                // Redirect to page with trend calls
                this.props.history.push({
                    pathname: '/TrendCall',
                    state: { from: this.state.fromCallDate, to: this.state.toCallDate }
                })
            }
            else {
                this.setState({ trendMessage: this.context.translate('date-error') });
            }
        }
        else {
            this.setState({ trendMessage: this.context.translate('all-fields') });
        }
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
                    <Card className="text-center mb-5">
                        <Card.Header>{this.context.translate('summary-report')}</Card.Header>
                        <Card.Body>
                            <Form>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>{this.context.translate('from')}</Form.Label>
                                        <Col sm={6}>
                                            <DatePicker
                                                selected={this.state.fromSummaryDateDisplay ? this.state.fromSummaryDateDisplay : false}
                                                placeholderText="dd/mm/yyyy"
                                                onChange={this.handleDateNoTime('fromSummaryDate')}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </Col>
                                        <Form.Label column sm={6}>{this.context.translate('to')}</Form.Label>
                                        <Col sm={6}>
                                            <DatePicker
                                                selected={this.state.toSummaryDateDisplay ? this.state.toSummaryDateDisplay : false}
                                                placeholderText="dd/mm/yyyy"
                                                onChange={this.handleDateNoTime('toSummaryDate')}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </Col>
                                        <Col sm={6} className="offset-3">
                                            <input type="button" onClick={this.createSummary} value={this.context.translate('create')} />
                                        </Col>
                                    </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    {this.state.message && <p> {this.state.message} </p>}

                    <Card className="text-center mt-5">
                        <Card.Header>{this.context.translate('trend-call')}</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>{this.context.translate('from')}</Form.Label>
                                    <Col sm={6}>
                                        <DatePicker
                                            selected={this.state.fromCallDateDisplay ? this.state.fromCallDateDisplay : false}
                                            placeholderText="dd/mm/yyyy"
                                            onChange={this.handleDateNoTime('fromCallDate')}
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </Col>
                                    <Form.Label column sm={6}>{this.context.translate('to')}</Form.Label>
                                    <Col sm={6}>
                                        <DatePicker
                                            selected={this.state.toCallDateDisplay ? this.state.toCallDateDisplay : false}
                                            placeholderText="dd/mm/yyyy"
                                            onChange={this.handleDateNoTime('toCallDate')}
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </Col>
                                    <Col sm={6} className="offset-3">
                                        <input type="button" onClick={this.trendAnalysis} value={this.context.translate('create')} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    {this.state.trendMessage && <p> {this.state.trendMessage} </p>}
                </Container>
            </React.Fragment>
        )
    }
}
export default withRouter(Statistics);