import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import '../App.css'

export default class Attachments extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            message: '',
            emptyMessage: null,
            selectedFile: null,
            files: []
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const options = {
            method: 'POST',
            credentials: 'include'
        }
        let url = `http://localhost:3000/api/charts/files/${this.props.chartId}`;
        fetch(url, options).then((response) => {
            if (!response.ok) {
                throw Error;
            }
            return response.json();
        }).then((res) => {
            this.setState({ files: [...res] });
        }).catch((error) => {

        });
  }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0]})
    }

    onFileUpload = () => {
        if(this.state.selectedFile){
            // Create an object of formData
            const formData = new FormData();

            // Update the formData object
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            const options = {
                method: 'POST',
                body: formData,
                credentials: 'include'
            }
            let url = `http://localhost:3000/api/charts/upload/${this.props.chartId}`;
            fetch(url, options).then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error;
                }
                this.setState({ message: this.context.translate("success"), selectedFile: null });
                return response.json();
            }).then((res) => {
                this.setState({ files: [...res]});
            })
            .catch((error) => {
                this.setState({ message: this.context.translate("error"), selectedFile: null });
            });
        }
        else{
            this.setState({ message: this.context.translate("all-fields"), selectedFile: null });
        }
    };

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }


    render() {
        var files = []
        if(this.state.files){
            this.state.files.forEach(element => {
                let url = `http://localhost:3000/api/charts/download/${this.props.chartId}/${element}`;
                files.push(<div><a className="mb-5" href={url}>{element}</a><br></br></div>);
            })
        }
        return (
            <React.Fragment>
                <Container className="chart shadow" style={{marginTop:'5rem'}}>
                    <h2>{this.context.translate("Attachments")}</h2>
                    {files}
                    <div>
                        <input type="file" onChange={this.onFileChange}/>
                        <br/>
                        <input type="button" onClick={this.onFileUpload} value={this.context.translate('submit')} className="mt-2"/>
                    </div>
                    {this.state.message}
                </Container>
            </React.Fragment>
        )
    }
}