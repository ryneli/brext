import React, { useState } from 'react';
import './App.css';
import MsApi from './MsApi';
import {RootPath} from './AppState';
import * as Model from './Model';
import Board from './Board';
import 'pepjs'
import Gesture from './Gesture';

var defaultBoard = require('./defaultBoard.json');

function App() {
  const [scale, setScale] = useState(1.0);
  const [board, setBoard] = useState(new Model.Board(defaultBoard));

  function onTap(e) {
    console.log('App#onTap %o', e);
  }
  const gesture = new Gesture({onTap});
  
  function handleScaleChange(e) {
    console.log('App#handleScaleChange %o', e.target.value);
    setScale(Number(e.target.value));
    board.viewport.transform.scaleX = Number(e.target.value);
    setBoard(board);
  }

  function handleScaleDown() {
    setScale(scale - 0.1);
    board.viewport.transform.scaleX = scale - 0.1;
    setBoard(board);
  }

  function handleScaleUp() {
    setScale(scale + 0.1);
    board.viewport.transform.scaleX = scale + 0.1;
    setBoard(board);
  }
  
  if (window.location.pathname === RootPath + 'msapi') {
    /**
     * Test MicroSoft API.
     */
    return (
      <div className="App">
        <MsApi></MsApi>
      </div>
    );
  } else {
    /**
     * Main Application.
     */
    return (
      <div className="App">
        <Board data={board}></Board>
        <div style={{position: "fixed", top: '0px', left: '0px', zIndex: 99}} 
          onPointerDown={gesture.onPointerDown.bind(gesture)}
          onPointerMove={gesture.onPointerMove.bind(gesture)}
          onPointerUp={gesture.onPointerUp.bind(gesture)}>
          <input 
            type="text" 
            value={scale} 
            onChange={ handleScaleChange } 
            placeholder="Write a scale number..." />
          <button onClick={handleScaleDown}>Scale-</button>
          <button onClick={handleScaleUp}>Scale+</button>
        </div>
      </div>
    );
  }
}

export default App;
