import React from 'react';
import './Board.css';
import Page from './Page';

function Board(props) {
    const data = props.data;
    return (
        <div touch-action="none"
            style={{position: "absolute", width: "10000px", height: "10000px"}}>
            {data.pages.map(function(page) {
                return <Page key={page.id} data={page} scale={data.viewport.transform.scaleX}></Page>;
            })}
        </div>
    );
}

export default Board;
