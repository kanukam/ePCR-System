import React, { Component } from 'react'
import UserSettings from '../components/UserSettings'
import AdminSettings from '../components/AdminSettings'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import MainNav from '../components/MainNav'
import { MainContext } from '../Auth'

export default class Settings extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            message: ""
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    remove = event => {
        event.preventDefault();
        if (window.confirm("Are you sure you would like to delete your account?")){
            const url = 'http://localhost:3000/users/0/remove';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                this.context.setAuth(false);
            }).catch((error) => {
                this.setState({ message: "Failed" });
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    settings={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container className='main-content' style={{ padding: this.state.contentSpacing }}>
                    <UserSettings />
                    <AdminSettings />
                    <div className="text-center">
                        <Button variant="danger" type="submit" className="mb-5 mt-5" onClick={this.remove}>Delete Account</Button>
                    </div>
                    {this.state.message && <p className="text-info"> {this.state.message} </p>}
                </Container>  
            </React.Fragment>
        )
    }
}