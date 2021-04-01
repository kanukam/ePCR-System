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
            notes: [],
            noteBox: '',
            emptyMessage: null,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.addNote = this.addNote.bind(this);
        this.textInput = this.textInput.bind(this);
        this.getNotes = this.getNotes.bind(this);
    }

    componentDidMount() {
        this.getNotes();
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    textInput(event){
        this.setState({noteBox: event.target.value});
    }

    getNotes(){
        /* send to backend */
        const url = 'http://localhost:3000/notes/chart/' + this.props.chartId;
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
                this.setState({notes: data});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

    addNote(){
        const note = this.state.noteBox;
        if(note !== ''){
            this.setState({emptyMessage: null});
            /* send to backend */
            const url = 'http://localhost:3000/notes/chart/' + this.props.chartId + '/add';
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
                this.setState({noteBox: ''});
                this.getNotes();
            }).catch((error) => {
                console.log(error);
            })
        }
        else{
            this.setState({emptyMessage: 'Note is empty!'});
        }
    }

    render() {
        let notesComps = [];
        this.state.notes.forEach(note => {
            let time = note['dateAdded'].substring(11, 19);
            console.log(time);
            let date = new Date(note['dateAdded']);
            notesComps.push(
                <Container className="chart shadow" key={note['noteID']}>
                    <p>{note['note']}</p>
                    <b>{note['name']}</b>
                    <br />
                    <i>{date.toLocaleDateString() + ' ' + time}</i>
                </Container>
            );
        });
        return (
            <React.Fragment>
                <Container className="chart shadow" style={{marginTop:'5rem'}}>
                    <h2>Notes:</h2>
                    {notesComps}
                    <Container className="chart shadow">
                        <textarea style={{resize:'none', width:'100%', height:'100px'}} value={this.state.noteBox} onChange={this.textInput}></textarea>
                        {this.state.emptyMessage && <b>{this.state.emptyMessage}</b>}
                    </Container>
                    <Button onClick={this.addNote}>Add Note</Button>
                </Container>
            </React.Fragment>
        )
    }
}