import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { MainContext } from '../Auth'
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export class UserDetails extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            certs: [],
            certBoxes: {1: false, 2: false, 3: false, 4: false, 5: false},
            visible: false
        };
        this.updateCert = this.updateCert.bind(this);
    }

    handleCertBoxes = boxNumber => event => {
        var vals = this.state.certs;
        var checkBoxValue = event.target.value;
        var certBoxes = this.state.certBoxes;
        var checkbox = certBoxes[boxNumber];
        // Remove word from array
        if (checkbox) {
            vals = vals.filter(word => word !== checkBoxValue);
            // Convert to array if integer
            if (vals === parseInt(vals, 10)) {
                vals = [vals];
            }
            // set state to False
            certBoxes[boxNumber] = false;
            this.setState({ certBoxes });
            // Set to filtered array
            this.setState({ certs: [...vals] });
        }
        else {
            // Add value and marked checked as true
            vals.push(checkBoxValue);
            certBoxes[boxNumber] = true;
            this.setState({ certBoxes });
            this.setState({ certs: [...vals] });
        }
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    handleOpen = () => {
        this.setState({ visible: true });
    }

    updateCert(event) {
        event.preventDefault();
        let certs = this.state.certs;
        certs = certs.join();
        const email = this.props.email;
        this.props.updateCertifications(certs, email);
        this.setState({ visible: false });
    }   

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>
                        {this.props.name}
                    </td>
                    <td>
                        {this.props.username}
                    </td>
                    <td>
                        {this.props.email}
                    </td>
                    <td>
                        {this.props.phone}
                    </td>
                    <td>
                        {this.context.translate(this.props.privilege)}
                    </td>
                    <td>
                        {this.props.privilege === "standard" && <input type="button" onClick={this.props.delete(this.props.email)} value={this.context.translate('delete')} />}
                    </td>
                    <td>
                        <Link onClick={this.handleOpen} to="/Settings">{this.context.translate('edit')}</Link>
                    </td>
                </tr>
                <Modal
                    show={this.state.visible}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.context.translate('cert')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.context.translate('cert')}: {this.props.certifications}</p><br></br>
                        <h4 > {this.context.translate('update')} {this.context.translate('cert')}</h4>
                        <Form.Group as={Row}>
                            <Col sm={6} className="mt-2">
                                <Form.Check type="checkbox" label="EMR" name="certs" value="EMR" checked={this.state.certBoxes[1]} onChange={this.handleCertBoxes(1)} />
                                <Form.Check type="checkbox" label="EMT" name="certs" value="EMT" checked={this.state.certBoxes[2]} onChange={this.handleCertBoxes(2)} />
                                <Form.Check type="checkbox" label={this.context.translate('paramedic')} name="certs" value="Paramedico" checked={this.state.certBoxes[3]} onChange={this.handleCertBoxes(3)} />
                                <Form.Check type="checkbox" label={this.context.translate('nurse')} name="certs" value="Enfermera" checked={this.state.certBoxes[4]} onChange={this.handleCertBoxes(4)} />
                                <Form.Check type="checkbox" label="Doctor" name="certs" value="Doctor" checked={this.state.certBoxes[5]} onChange={this.handleCertBoxes(5)} />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="button" className="cancel" onClick={this.handleClose} value={this.context.translate('close')} />
                        <input type="button" onClick={this.updateCert} value={this.context.translate('save')} />
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        )
    }
}

export default UserDetails