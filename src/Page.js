import React, { Component } from 'react';
import './Page.css';
var PDFJS = require('pdfjs-dist');

/**
 * Github service and local service have different path.
 */
if (window.location.hostname === 'localhost') {
    PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
} else {
    PDFJS.GlobalWorkerOptions.workerSrc = '/brext/pdf.worker.js';
}

var url = 'https://zhenqiang.li/pdf/zaijidulizhangjin.pdf',
    targetElement = null,
    pageRendering = false,
    currentNumber = 0;

class Page extends Component {
    constructor(props) {
        super(props);
        this.pageBg = React.createRef();
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
        PDFJS.getDocument(url).promise.then(function(pdfDoc) {
            console.log('get pdfDoc_ %o', pdfDoc);
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function(page) {
                const targetRect = targetElement.getBoundingClientRect();
                let viewport = page.getViewport(1.0);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const widthRatio = targetRect.width / viewport.width;
                const heightRatio = targetRect.height / viewport.height;
                viewport = page.getViewport(Math.min(widthRatio, heightRatio));
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                console.log('renderPage done %o %o %o %o => init canvas', targetElement, page, canvas, viewport);
            
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
            
                // Wait for rendering to finish
                renderTask.promise.then(() => {
                    console.log('renderPage done %o', targetElement);
                    if (targetElement !== null) {
                        console.log('renderPage done %o %o %o => paper', targetElement, canvas, canvas.toDataURL('image/png'));
                        targetElement.style.backgroundImage = `url("${canvas.toDataURL('image/png')}")`;
                    }
                }, (e)=> console.log(e));
                currentNumber += 1;
            }, (e) => console.log('getDocument error %o', e));
        });
    }

    render() {
        this.setBackground();
        return (
        <div className='paper' 
            style={{
                fontSize: '40px', 
                position: 'absolute',
                top: '0px', 
                left: '0px', 
                width: '100%', 
                height: '100%'}}>
            <div id={'page' + this.props.pageNumber} ref={this.pageBg}
                style={{
                    width: '100%', 
                    height: '100%'}}></div>
        </div>);
    }
}

export default Page;
