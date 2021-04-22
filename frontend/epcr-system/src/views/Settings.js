import React, { Component } from 'react'
import UserSettings from '../components/UserSettings'
import AdminSettings from '../components/AdminSettings'
import Container from 'react-bootstrap/Container'
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
        if (window.confirm(this.context.translate('delete-self'))){
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
                this.setState({ message: this.context.translate('failed') });
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
                <Container className='mt-4 main-content' style={{ padding: this.state.contentSpacing }}>
                    <UserSettings />
                    <AdminSettings />
                    <div className="text-center mt-2">
                        <input type="button" className="danger" onClick={this.remove} value={this.context.translate('delete-account')} />
                    </div>
                    {this.state.message && <p className="text-info"> {this.state.message} </p>}
                </Container>  
            </React.Fragment>
        )
    }
}