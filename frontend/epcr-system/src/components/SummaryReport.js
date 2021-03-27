import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import MainNav from '../components/MainNav';
import { MainContext } from '../Auth';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class SummaryReport extends Component {
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

    render() {
        const {summary} = this.state;
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
                    <Card>
                        <Card.Header as="h5">{this.context.translate('patient')} {this.context.translate('classification')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('adult')}:</Form.Label>
                                <Col xs={2} className="mt-2">
                                    4
                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('senior-adult')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('pediatric')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('neonatal')}:</Form.Label>
                                <Col xs={2} className="mt-2">
                                    
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('psex')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('male')}:</Form.Label>
                                <Col xs={2} className="mt-2">
                                    4
                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('female')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('call-nature')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('bp-check')}:</Form.Label>
                                <Col xs={2} className="mt-2">
                                    
                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('injection')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('medical-other')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('cardiac')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('pulmonary')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Trauma:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>OB:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('ilocation')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('rescate-clinic')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('chome')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('business')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('road-hwy')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('construction-site')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('ocean-bay')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('beach')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Marina:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('med-office')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('school')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('disposition')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('treat-release')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('transport')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('na-locate')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('doa')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('ama')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('destination')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>{this.context.translate('rescate-clinic')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                                <Form.Label column xs={4}>IMSS:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>ISTESON:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>SEMESON:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>ISSSTE:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Pabellon Guadalupe:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Hospital Cima:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Hospital Clinica Del Noroeste:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Hospital Clinica Del Noroeste:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>Hospital San Benito:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mt-5">
                        <Card.Header as="h5">{this.context.translate('trauma-cause')}</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column xs={4}>Animal:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                                <Form.Label column xs={4}>{this.context.translate('assault')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('motor-vehicle')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('bicycle')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('boat')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('drown')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('electrical')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('explosion')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('fall')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('fire')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('gun')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('tools')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('stabbing')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('object-struck')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('toxic-subst')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('other-vehicle')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>

                                <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                <Col xs={2} className="mt-2">

                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}