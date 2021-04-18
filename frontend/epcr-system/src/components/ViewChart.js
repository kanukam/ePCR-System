import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import Notes from './Notes';
import ShowVital from './ShowVital';
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

    componentDidMount() {
        const url = 'http://localhost:3000/charts/patient/' + this.props.match.params.id;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({chart: data['chart'][0]});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }


    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    dateOnly(year) {
        return moment(year).utc().format('DD/MM/YYYY');
    }

    dateAndTime(year) {
        return moment(year).utc().format('DD/MM/YYYY hh:mm A');
    }


    render() {
        // Will error if object destructuring happens and chart isn't sent yet, if statement prevents the error
        if (this.state.chart){
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
        else{
            return null;
        }
    }
}