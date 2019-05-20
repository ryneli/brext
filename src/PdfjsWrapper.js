import {RootPath} from './AppState';
var PDFJS = require('pdfjs-dist');
/**
 * Github service and local service have different path.
 */
PDFJS.GlobalWorkerOptions.workerSrc = RootPath + 'pdf.worker.js';

class PdfjsWrapper {
    getPdfInfo(url) {}

    async getPageAsImg(url, pageNumber) {
        if (pageNumber <= 1) {
            pageNumber = 1;
        }
        console.log('PdfjsWrapper#getPageAsImg async  %o %o', url, pageNumber);
        return PDFJS.getDocument(url).promise.then(function(pdfDoc) {
            console.log('PdfjsWrapper#getPageAsImg async  %o', pdfDoc);
            // Using promise to fetch the page
            return pdfDoc.getPage(pageNumber).then(function(page) {
                let viewport = page.getViewport(2.0);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                console.log('getPageAsImg#renderPage start done %o %o', 
                    viewport.width, viewport.height);
            
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                var renderTask = page.render(renderContext);
            
                // Wait for rendering to finish
                return renderTask.promise.then(() => {
                    return canvas;
                }, (e)=> console.log(e));
            }, (e) => console.log('getPageAsImg#getDocument error %o', e));
        });
    }
}

export default PdfjsWrapper;
