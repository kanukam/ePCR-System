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
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
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
                </Container>  
            </React.Fragment>
        )
    }
}