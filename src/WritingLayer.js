import React, { Component } from 'react';
import './WritingLayer.css';

class Drawable {
    constructor(targetSvg) {
        this.svg = targetSvg;
        this.initPath();
    }

    initPath() {
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('stroke', 'black');
        this.path.setAttribute('fill', 'none');
        this.path.setAttribute('stroke-width', '2');
        this.d = '';
    }

    startAction(x, y) {
        console.log('Drawable#startAction (%o, %o)', x, y);
        this.initPath();
        this.d = `M ${x} ${y}`;
        this.svg.append(this.path);
        this.previousPoint = {x, y};
    }

    updateAction(x, y) {
        if (this.previousPoint && this.d.startsWith('M')) {
            this.d = `${this.d} C ${x} ${y} 
                        ${this.previousPoint.x} ${this.previousPoint.y}
                        ${(x + this.previousPoint.x)/2} ${(y + this.previousPoint.y)/2} `;
            this.path.setAttribute('d', `${this.d}`);
            this.previousPoint = {x, y};
        }
    }

    endAction(x, y) {
        this.initPath();
    }
}

class WritingLayer extends Component {
    constructor(props) {
        super(props);
        this.writingCanvas = React.createRef();
        this.currentActioner = null;
    }

    getTouchType(inType) {
        switch(inType) {
            case 'direct':
                return 'touch';
            case 'stylus':
                return 'pen';
            default:
                return inType;
        }
    }

    initPointerListeners(element) {
        element.addEventListener("touchstart", (e) => {
            console.log('touchstart %o', e);
            const rect = element.getBoundingClientRect();
            const touch = e.touches[0];
            this.startAction(
                touch.clientX - rect.left, 
                touch.clientY - rect.top, 
                this.getTouchType(touch.touchType));
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("touchmove", (e) => {
            const rect = element.getBoundingClientRect();
            const touch = e.touches[0];
            this.updateAction(
                touch.clientX - rect.left, 
                touch.clientY - rect.top, 
                this.getTouchType(touch.touchType));
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("touchend", (e) => {
            const rect = element.getBoundingClientRect();
            const touch = e.touches[0];
            this.endAction(-1, -1, 'unknown');
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("mousedown", (e) => {
            const rect = element.getBoundingClientRect();
            this.startAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            this.updateAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("mouseup", (e) => {
            const rect = element.getBoundingClientRect();
            this.endAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("pointerdown", (e) => {
            console.log('WL#pointerDown %o %o', element, e)
            const rect = element.getBoundingClientRect();
            this.startAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("pointermove", (e) => {
            const rect = element.getBoundingClientRect();
            this.updateAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
            e.preventDefault();
            e.stopPropagation();
        });
        element.addEventListener("pointerup", (e) => {
            const rect = element.getBoundingClientRect();
            this.endAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
            e.preventDefault();
            e.stopPropagation();
        });
    }

    startAction(x, y, touchType) {
        if (touchType !== 'touch') {
            if (this.currentActioner) {
                this.currentActioner.startAction(x, y);
            }
        }
    }
    updateAction(x, y, touchType) {
        if (this.currentActioner) {
            this.currentActioner.updateAction(x, y);
        }
    }
    endAction(x, y, touchType) {
        if (this.currentActioner) {
            this.currentActioner.endAction(x, y);
        }
    }

    componentDidMount() {
        console.log('WritingLayer#componentDidMount %o', this.writingCanvas.current);
        this.initPointerListeners(this.writingCanvas.current);
        this.currentActioner = new Drawable(this.writingCanvas.current);
    }

    render() {
        return (
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
            <svg ref={this.writingCanvas}  style={{width: '100%', height: '100%'}}></svg>
        </div>);
    }
}

export default WritingLayer;
