import React, { Component } from 'react';
import { MainContext } from '../Auth';
import MainNav from './MainNav';
import Notes from './Notes';
import '../App.css'
import moment from 'moment'

export default class ViewChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            chart: []
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }


    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    viewcharts={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <div >
                    <embed src={`http://localhost:3000/charts/${this.props.match.params.id}/pdf?locale=${this.context.language}#scrollbar=1`}  type="application/pdf" width={"100%"} style={{width: "100%", height:"700px"}}>

                    </embed>
                    {this.state.chart['id'] && <Notes chartId={this.state.chart['id']} />}
                </div>
            </React.Fragment>
        )
    }
}