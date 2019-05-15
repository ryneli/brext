import React, { Component } from 'react';
import './Board.css';
import Page from './Page';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';

class Board extends Component {
    render() {
        const data = this.props.data;
        console.log('Board#render %o', data);
        return (
            <div>
                {data.pages.map(function(page) {
                    return <Page key={page.id} data={page} scale={data.viewport.transform.scaleX}></Page>;
                })}
            </div>
        );
    }
}

export default Board;
