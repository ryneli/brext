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
        this.pageBg = React.createRef();
        this.state = {
            width: 0,
            height: 0,
        };
    }

    setBackground() {
        console.log('Page#setBackground %o', PDFJS);
        this.pdfSetBackground();
    }

    pdfSetBackground() {
        /**
         * Asynchronously downloads PDF.
         */
        const targetElement = this.pageBg.current;
        const num = this.props.pageNumber;
        var self = this;
        PDFJS.getDocument(url).promise.then(function(pdfDoc) {
            console.log('Page#pdfSetBackground async  %o', pdfDoc);
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function(page) {
                console.log('Page#pdfSetBackground async async  %o', self);
                const targetRect = targetElement.getBoundingClientRect();
                let viewport = page.getViewport(2.0);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                self.state.width = viewport.width;
                self.state.height = viewport.height;
                console.log('renderPage start done %o %o %o %o', 
                    viewport.width, viewport.height, self.state.width, self.state.height);
            
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                var renderTask = page.render(renderContext);
            
                // Wait for rendering to finish
                renderTask.promise.then(() => {
                    console.log('renderPage done');
                    if (targetElement !== null) {
                        targetElement.style.backgroundImage = `url("${canvas.toDataURL('image/png')}")`;
                    }
                }, (e)=> console.log(e));

                currentNumber += 1;
            }, (e) => console.log('getDocument error %o', e));
        });
    }

    render() {
        console.log('rendering %o, %o', this.state.width, this.state.height);
            this.setBackground();
        return (
            <div style={{
                position: 'absolute',
                top: '0px', 
                left: '0px', 
                borderColor: 'black',
                borderStyle: 'dashed',
                borderWidth: '2px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                backgroundSize: 'contain',
                width: this.state.width * this.props.scale, 
                height: this.state.height * this.props.scale}}
                id={'page' + this.props.pageNumber + this.props.scale} 
                ref={this.pageBg}>
            </div>
            );
    }
}

export default Page;
