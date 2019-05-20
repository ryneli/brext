import React, { useState, useEffect } from 'react';
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
        this.path.setAttribute('stroke-width', '1');
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

function WritingLayer() {
    const writingCanvas = React.createRef();
    const [currentActioner, setCurrentActioner] = useState(null);
    const [writing, setWriting] = useState(new Model.Writing({}));
    const [currentStroke, setCurrentStroke] = useState(new Model.Stroke({}));

    function startAction(x, y, touchType) {
        if (touchType !== 'touch') {
            if (currentActioner) {
                currentActioner.startAction(x, y);
            }
        }
    }

    function updateAction(x, y, touchType) {
        if (currentActioner) {
            currentActioner.updateAction(x, y);
        }
    }
    
    function endAction(x, y, touchType) {
        if (currentActioner) {
            currentActioner.endAction(x, y);
        }
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function getPoint(e) {
        const rect = writingCanvas.current.getBoundingClientRect();
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

    function tryUpdateWriting() {
        if (currentStroke.points.length > 0) {
            writing.strokes.push(currentStroke);
            setWriting(writing);
            console.log('WL#tryUpdateWriting %o', writing);
        }
        setCurrentStroke(new Model.Stroke({}));
    }

    function onPointerDown(e) {
        tryUpdateWriting();
        const point = getPoint(e);
        currentStroke.points.push(point);
        setCurrentStroke(currentStroke);
        startAction(point.x, point.y, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    function onPointerMove(e) {
        const point = getPoint(e);
        currentStroke.points.push(point);
        setCurrentStroke(currentStroke);
        updateAction(point.x, point.y, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    function onPointerUp(e) {
        const point = getPoint(e);
        currentStroke.points.push(point);
        setCurrentStroke(currentStroke);
        tryUpdateWriting();
        endAction(point.x, point.y, e.pointerType);
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        function componentCleanup() {
            console.log('WritingLayer#componentCleanup %o', writing);
            localStorage.setItem('test', JSON.stringify(writing));
        }

        console.log('WritingLayer#componentDidMount %o', writingCanvas.current);
        setCurrentActioner(new Drawable(writingCanvas.current))
        window.addEventListener('beforeunload', componentCleanup);
        return () => {
            window.removeEventListener('beforeunload', componentCleanup);
        };
    }, [writing, writingCanvas]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <svg ref={writingCanvas}  style={{width: '100%', height: '100%'}} touch-action="none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}></svg>
        </div>);
}

export default WritingLayer;
