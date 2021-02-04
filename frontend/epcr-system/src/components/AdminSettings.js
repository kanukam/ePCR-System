import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default class Settings extends Component {
    default = [{ u: 1, x: 2, a: 3 }, { u: 1, x: 2, a: 3 }, { u: 1, x: 2, a: 3 }, { u: 1, x: 2, a: 3 }]
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
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.default.map( ( {u, x, a} ) => {
                                                return(
                                                    <tr>
                                                        <td>
                                                            {u}
                                                        </td>
                                                        <td>
                                                            {x}
                                                        </td>
                                                        <td>
                                                            {x}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

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
