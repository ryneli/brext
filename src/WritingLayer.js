import React, { Component } from 'react';
import * as Model from './Model';
import './WritingLayer.css';
import 'pepjs'

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
        this.writing = new Model.Writing({});
    }

    startAction(x, y, touchType) {
        console.log('WL#startAction %o %o %o', x, y, touchType);
        if (touchType === 'touch') {
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
        console.log('WL#endAction %o %o %o', x, y, touchType);
        if (this.currentActioner) {
            this.currentActioner.endAction(x, y);
        }
    }

    onPointerDown(e) {
        console.log('WL#pointerDown %o %o', this.element, e)
        const rect = this.element.getBoundingClientRect();
        this.startAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerMove(e) {
        const rect = this.element.getBoundingClientRect();
        this.updateAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerUp(e) {
        console.log('WL#pointerUp %o %o', this.element, e)
        const rect = this.element.getBoundingClientRect();
        this.endAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    componentDidMount() {
        console.log('WritingLayer#componentDidMount %o', this.writingCanvas.current);
        this.element = this.writingCanvas.current;
        this.currentActioner = new Drawable(this.element);
    }

    render() {
        return (
        <div style={{width: '100%', height: '100%'}}>
            <svg ref={this.writingCanvas}  style={{width: '100%', height: '100%'}} touch-action="none"
                onPointerDown={this.onPointerDown.bind(this)}
                onPointerMove={this.onPointerMove.bind(this)}
                onPointerUp={this.onPointerUp.bind(this)}></svg>
        </div>);
    }
}

export default WritingLayer;
