import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default class Settings extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <Card.Body>
                                <Card.Title>Admin Settings</Card.Title>
                                <Table responsive className="mt-5">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>E-mail</th>
                                            <th>Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                        </tr>
                                        <tr>

                                        </tr>
                                        <tr>

                                        </tr>

                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
