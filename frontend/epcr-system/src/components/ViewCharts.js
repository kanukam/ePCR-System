import 'date-fns';
import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import ChartPreview from './ChartPreview';
import TextField from '@material-ui/core/TextField';
import MatButton from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../App.css';
import moment from 'moment';

export default class ViewCharts extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            filtered: [],
            filter: false,
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            dob: null,
            startdate: null,
            enddate: null,
            firstname: "",
            lastname: "",
            isData: null,

        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.search = this.search.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    componentDidMount() {
        // Delay slightly to allow server to insert into table
        setTimeout(() => {
            const url = 'http://localhost:3000/api/charts/patients';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            fetch(url, options)
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw Error("Failed");
                })
                .then((data) => {
                    this.setState({ charts: data["charts"].reverse() });
                    (this.state.charts.length === 0) ? this.setState({isData: false}) : this.setState({isData: true});
                })
                .catch((error) => {
                    console.log(error);
                }); 
        }, 500)
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    searchChange = field => event =>{
        this.setState({[field]: event.target.value});
    }

    searchClear = event => {
        event.preventDefault();
        this.setState({
            filter: false,
            dob: null,
            startdate: null,
            enddate: null,
            firstname: "",
            lastname: "" });
    }

    dateChange = field => date => {
      this.setState({[field]: date});
    };

    
    search(event){
        event.preventDefault();
        // filter first name
        let filtered = this.state.charts;
        if(this.state.firstname){
            filtered = filtered.filter(chart => chart.fname.toLowerCase() === this.state.firstname.toLowerCase());
        }
        // filter last name
        if (this.state.lastname) {
            filtered = filtered.filter(chart => chart.lname.toLowerCase() === this.state.lastname.toLowerCase());
        }
        // filter birth
        if (this.state.dob) {
            var a = new Date(this.state.dob);
            filtered = filtered.filter(chart => {
                var b = moment(chart.birth).utc();
                return (a.getMonth() === b.month()) && (a.getDate() === b.date()) && ((a.getFullYear() === b.year()));
            })
        }
        // filter start date
        if (this.state.startdate) {
            filtered = filtered.filter(chart => {
                var a = new Date(this.state.startdate);
                var b = new Date(chart.incident_date);
                return b >= a;
            })
        }
        // filter end date
        if (this.state.enddate) {
            filtered = filtered.filter(chart => {
                var a = new Date(this.state.enddate);
                var b = new Date(chart.incident_date);
                return b <= a;
            })
        }
        // set filtered bool to true, assign filtered state array
        this.setState({filter: true, filtered: filtered});
    }

    render() {
        let searchPadding = '5px 0 5px ' + this.state.contentSpacing.slice(6);
        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    viewcharts={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <div className="main-content" style={{padding: searchPadding, backgroundColor: '#EFEFEF', display: 'flex', justifyContent: 'center'}}> 
                    <form onSubmit={this.search}>      
                        <TextField 
                            id="firstname" 
                            size="small"
                            label={this.context.translate('first-name')} 
                            type="search" 
                            style={{width: '125px'}}
                            value={this.state.firstname}
                            onChange={this.searchChange('firstname')} 
                        />
                        &nbsp;
                        <TextField 
                            id="lastname" 
                            size="small" 
                            label={this.context.translate('last-name')} 
                            type="search" 
                            style={{width: '125px'}}
                            value={this.state.lastname}
                            onChange={this.searchChange('lastname')} 
                        />
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="dob"
                                label={this.context.translate('dob')}
                                value={this.state.dob}
                                onChange={this.dateChange('dob')}
                                style={{maxWidth: '140px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="startdate"
                                label={this.context.translate('start-date')}
                                value={this.state.startdate}
                                onChange={this.dateChange('startdate')}
                                style={{maxWidth: '150px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                size="small"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="enddate"
                                label={this.context.translate('end-date')}
                                value={this.state.enddate}
                                onChange={this.dateChange('enddate')}
                                style={{maxWidth: '150px', margin: '0 0 0 0'}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <MatButton style={{ marginTop: '10px' }} type="submit" color="default">{this.context.translate('search')}</MatButton>
                        <MatButton style={{ marginTop: '10px' }} color="default" onClick={this.searchClear}>{this.context.translate('clear')}</MatButton>
                    </form>
                </div>
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    {this.state.isData === false && <div><br /><h2 style={{textAlign:"center"}}>There are currently no patient charts in the system</h2></div>}

                    {this.state.charts && !this.state.filter && this.state.charts.map(({ estimated_age, fname, lname, birth, p_address, p_phone, id, call_type, incident_date, location}, idx) => {
                        return (
                            <ChartPreview fname={fname} estimated_age={estimated_age} lname={lname} birth={birth} address={p_address} phone={p_phone} id={id} call_type={call_type} incident_date={incident_date} location={location} key={idx} />
                        )
                    })}

                    {this.state.charts && this.state.filter && this.state.filtered.map(({estimated_age, fname, lname, birth, p_address, p_phone, id, call_type, incident_date, location }, idx) => {
                        return (
                            <ChartPreview fname={fname} estimated_age={estimated_age} lname={lname} birth={birth} address={p_address} phone={p_phone} id={id} call_type={call_type} incident_date={incident_date} location={location} key={idx} />
                        )
                    })}

                </Container>
            </React.Fragment>
        )
    }
}