import React from 'react';
import "./js/global";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';

// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";

import "bootstrap/dist/css/bootstrap.css";
import { upload } from './api';


class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showCode: false }
        console.log(this.props.value)
        this.onChange = this.onChange.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
    }

    onChange(content) {
        console.log({ content })
        this.props.handleChange(content)
    }

    //from https://stackoverflow.com/questions/30993836/paste-content-as-plain-text-in-summernote-editor
    //Thank you https://stackoverflow.com/users/123415/jcuenod
    onPaste = (e) => {
        const bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        document.execCommand('insertText', false, bufferText);
        console.log('pasted')
    }

    onImageUpload = (fileList) => {
        this.setState({ showCode: true });
        upload(fileList[0])
            .then(url => {
                console.log("image url", url)
                let htmlTag = ` <img src='${url.name}' class="img-responsive" alt="uploaded question helper visual" />`;
                this.props.handleChange(`${this.props.value} ${htmlTag}`)
                this.setState({ showCode: false })

            }).catch(err => {
                alert(err)
                console.log(err)
            })
    }

    render() {
        console.log("value is", this.props.value)
        return (
            <ReactSummernote
            className={this.props.index}
                onInit={
                    (self) => 
                    { 
                        console.log({this: self});
                        const editArea = document.querySelector(`.${this.props.index} .note-editable`);
                        editArea.innerHTML =this.props.value; 
                    }
                }
                codeView={this.state.showCode}
                options={{
                    height: 150,
                    dialogsInBody: false,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'italic', 'strikethrough', 'superscript', 'subscript', 'clear',]],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']]
                    ],
                    fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48' , '64', '82', '150']
                }}
                value={this.props.value}
                onChange={this.onChange}
                onPaste={this.onPaste}
                onImageUpload={this.onImageUpload}
            />

        );
    }
}

export default TextEditor;
