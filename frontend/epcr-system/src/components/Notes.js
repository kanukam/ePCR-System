import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class Notes extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            message: '',
            success: null,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    componentDidMount() {

    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    addNote(){
        const note = "TESTING";
        /* send to backend */
        const url = 'http://localhost:3000/notes/0/chart/1/add';
        const options = {
            method: 'POST',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options).then((response) => {
            if (!response.ok) {
                throw Error;
            }
            this.setState({ message: "Add Successful" });
        }).catch((error) => {
            console.log(error);
        })
        this.setState({
            success: true
        })
        console.log(this.state.message);
    }

    render() {
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
                    <Button onClick={this.addNote}>Add Note</Button>
                </Container>
            </React.Fragment>
        )
    }
}
