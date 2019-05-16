import React, { Component } from 'react';
import './Board.css';
import Page from './Page';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';

class Board extends Component {
    render() {
        const data = this.props.data;
        return (
            <div touch-action="none"
                style={{position: "absolute", width: "10000px", height: "10000px"}}>
                {data.pages.map(function(page) {
                    return <Page key={page.id} data={page} scale={data.viewport.transform.scaleX}></Page>;
                })}
            </div>
        );
    }
}

export default Board;
