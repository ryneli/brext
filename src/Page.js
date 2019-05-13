import React, { Component } from 'react';
import './Page.css';
import {RootPath} from './AppState';
var PDFJS = require('pdfjs-dist');

/**
 * Github service and local service have different path.
 */
PDFJS.GlobalWorkerOptions.workerSrc = RootPath + 'pdf.worker.js';

var url = 'https://zhenqiang.li/pdf/zaijidulizhangjin.pdf',
    targetElement = null,
    pageRendering = false,
    currentNumber = 0;

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.canvas !== null) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '0px', 
                    left: '0px', 
                    borderColor: 'black',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    backgroundImage: `url("${this.props.canvas.toDataURL('image/png')}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center', 
                    backgroundSize: 'contain',
                    width: this.props.canvas.width * this.props.scale, 
                    height: this.props.canvas.height * this.props.scale}}
                    id={'page' + this.props.pageNumber + this.props.scale}>
                </div>
                );
        } else {
            return (<div>loading</div>);
        }
        
    }
}

export default Page;
