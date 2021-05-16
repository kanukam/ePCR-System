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
            selectedFileImg: null,
            selectedFileName: null,
            files: [],
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
        var extensions = ["jpg", "jpeg", "jfif", "tiff", "tif", "gif", "bmp", "png", "webp"];
        var fileName = null;
        var fileExt = null;
        // if there is a file being selected
        if(event.target.files[0]) {
            fileName = event.target.files[0].name;
            fileExt = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
            fileExt = fileExt.toLowerCase();
            // check for the extensions, preview only if file is image file extensions
            if(extensions.includes(fileExt)) {
                this.setState({ selectedFileImg: URL.createObjectURL(event.target.files[0]) })
            } else { this.setState({ selectedFileImg: '/noPreview.jpg' }) }
            this.setState({ selectedFileName: fileName });
        } else {
            // reset image and name if no file selected
            this.setState({ selectedFileImg: null });
            this.setState({ selectedFileName: null });
        }
        this.setState({ selectedFile: event.target.files[0] })
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
        else {
            this.setState({ message: this.context.translate("all-fields"), selectedFile: null });
        }
        // reset image and name of previous upload
        this.setState({ selectedFileImg: null });
        this.setState({ selectedFileName: null });
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
                    <h2>{this.context.translate("attachments")}</h2>
                    {files}
                    <div>
                        <div className="previewbutton">
                            {this.context.translate('choose-new-file')}
                            <input type="file" className="file" onChange={this.onFileChange}/>
                        </div>
                        <img className="previewimg" src={this.state.selectedFileImg}/>
                        <div className="previewtext">{this.state.selectedFileName}</div>
                        {/*<input type="file" onChange={this.onFileChange}/>*/}
                        <input type="button" onClick={this.onFileUpload} value={this.context.translate('attach-file')} className="mt-2"/>
                    </div>
                    <p className="text-info">{this.state.message}</p>
                </Container>
            </React.Fragment>
        )
    }
}