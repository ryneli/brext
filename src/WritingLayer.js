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
        this.path.setAttribute('stroke-width', '0.4');
        this.d = '';
    }

    componentDidUpdate() {
        console.log('WL#componentDidUpdate');
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
            this.d = `${this.d} Q ${this.previousPoint.x} ${this.previousPoint.y}
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
        this.currentStroke = new Model.Stroke({});
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

    /**
     * 
     * @param {PointerEvent} e 
     */
    getPoint(e) {
        const rect = this.element.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            t: Date.now(),
            pressure: e.pressure,
            tiltX: e.tiltX,
            tiltY: e.tiltY
        };
        return point;
    }

    tryUpdateWriting() {
        if (this.currentStroke.points.length > 0) {
            this.writing.strokes.push(this.currentStroke);
            console.log('WL#onPointerDown %o', this.writing);
        }
        this.currentStroke = new Model.Stroke({});
    }

    onPointerDown(e) {
        this.tryUpdateWriting();
        const point = this.getPoint(e);
        this.currentStroke.points.push(point);
        this.startAction(point.x, point.y, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerMove(e) {
        const point = this.getPoint(e);
        this.currentStroke.points.push(point);
        this.updateAction(point.x, point.y, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerUp(e) {
        const point = this.getPoint(e);
        this.currentStroke.points.push(point);
        this.tryUpdateWriting();
        this.endAction(point.x, point.y, e.pointerType);
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
