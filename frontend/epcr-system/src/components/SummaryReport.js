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

    saveAsPdf = (event) => {
        event.preventDefault();
        window.print();
    }

    render() {
        const {summary} = this.state;
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
                            <h1 className="text-center">{moment(from).format("DD/MM/YYYY")} - {moment(to).format("DD/MM/YYYY") }</h1>
                            <Card>
                                <Card.Header as="h5">{this.context.translate('patient')} {this.context.translate('classification')}</Card.Header>
                                <Card.Body>
                                    <Form.Group as={Row}>
                                        <Form.Label column xs={4}>{this.context.translate('adult')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.adults}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('senior-adult')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.seniors}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('pediatric')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.pediatrics}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('neonatal')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.neonatals}
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
                                            {summary.males}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('female')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.females}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.other_sex}
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
                                            {summary.bp}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('injection')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.injection}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('medical-other')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.medical_other}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('cardiac')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.cardiac}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('pulmonary')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.pulmonary}
                                        </Col>

                                        <Form.Label column xs={4}>Trauma:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.trauma}
                                        </Col>

                                        <Form.Label column xs={4}>OB:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.ob}
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
                                            {summary.il_rescate}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('chome')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.home}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('business')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.business}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('road-hwy')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.road}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('construction-site')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.construction}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('ocean-bay')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.ocean}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('beach')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.beach}
                                        </Col>

                                        <Form.Label column xs={4}>Marina:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.marina}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('med-office')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.medical_office}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('school')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.school}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.other}
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
                                            {summary.treat_release}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('transport')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.transport}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('na-locate')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.unable}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('doa')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.doa}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('ama')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.ama}
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
                                            {summary.dest_rescate}
                                        </Col>
                                        <Form.Label column xs={4}>IMSS:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.imss}
                                        </Col>

                                        <Form.Label column xs={4}>ISTESON:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.isteson}
                                        </Col>

                                        <Form.Label column xs={4}>SEMESON:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.semeson}
                                        </Col>

                                        <Form.Label column xs={4}>ISSSTE:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.isste}
                                        </Col>

                                        <Form.Label column xs={4}>Pabellon Guadalupe:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.pabellon}
                                        </Col>

                                        <Form.Label column xs={4}>Hospital Cima:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.hospital_cima}
                                        </Col>

                                        <Form.Label column xs={4}>Hospital Clinica Del Noroeste:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.hospital_clinica}
                                        </Col>

                                        <Form.Label column xs={4}>Hospital San Benito:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.hospital_san}
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
                                            {summary.animal}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('assault')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.assault}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('motor-vehicle')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.motor}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('bicycle')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.bike}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('boat')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.boat}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('drown')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.drown}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('electrical')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.electrical}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('explosion')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.explosion}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('fall')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.fall}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('fire')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.fire}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('gun')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.gun}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('tools')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.tools}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('stabbing')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.stabbing}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('object-struck')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.struck}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('toxic-subst')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.toxic}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('other-vehicle')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.vehicle}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('other')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.trauma_other}
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Card className="mt-5">
                                <Card.Header as="h5">Procedures</Card.Header>
                                <Card.Body>
                                    <Form.Group as={Row}>
                                        <Form.Label column xs={4}>{this.context.translate('io_iv')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.io}
                                        </Col>
                                        <Form.Label column xs={4}>{this.context.translate('pleural_decomp')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.pleural}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('airway_lma')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.airway_lma}

                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('airway_intub')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.airway_intub}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('crico')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.crico}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('cardiac_arrest')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.cardiac_arrest}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('cardiac_aed')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.cardiac_aed}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('cardiac_defib')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.cardiac_manual}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('cardiac_pacing')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.cardiac_pacing}
                                        </Col>

                                        <Form.Label column xs={4}>{this.context.translate('obstetrics')}:</Form.Label>
                                        <Col xs={2} className="mt-2">
                                            {summary.ob}
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <Button className="mt-3 mb-3" onClick={this.saveAsPdf}>{this.context.translate('save')}</Button>
                        </Container>
                    </React.Fragment>
                )
        }
        else{
            return null;
        }
    }
}