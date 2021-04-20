import React, { Component } from 'react';
import { MainContext } from '../Auth';
import MainNav from './MainNav';
import Notes from './Notes';
import '../App.css'

export default class ViewChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            chart: [],
            chartsrc: "",
            random: 100,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.reload = this.reload.bind(this);
    }
    
    componentDidMount(){
        this.setState({chartsrc: `http://localhost:3000/charts/${this.props.match.params.id}/pdf?locale=${this.context.language}#scrollbar=1`})
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }
    
    reload(chartId, language){
        this.setState({chartsrc: `http://localhost:3000/charts/${chartId}/pdf?locale=${language}#scrollbar=1`});
        this.setState({random: this.state.random + 1});
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
                <div className="iframe-padding">
                    <iframe title="chart" id='pdfpreview' src={this.state.chartsrc} key={this.state.random}  type="application/pdf" width={"100%"} style={{width: "100%", height:"700px"}}>

                    </iframe>
                    <Notes reload={this.reload} chartId={this.props.match.params.id} />
                </div>
            </React.Fragment>
        )
    }
}