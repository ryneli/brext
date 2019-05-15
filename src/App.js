import React, { Component } from 'react';
import './App.css';
import MsApi, {msApiUploadFile, msApiUpdateFile, msApiDownloadFile} from './MsApi';
import {RootPath} from './AppState';
import PdfjsWrapper from './PdfjsWrapper';
import * as Model from './Model';
import Board from './Board';
import 'pepjs'

var defaultBoard = require('./defaultBoard.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      canvas: null,
      scale: 1.0,
      pdfjsWrapper: new PdfjsWrapper(),
    };

    this.board = new Model.Board(defaultBoard);
  }

  loadPage() {
    this.state.pdfjsWrapper.getPageAsImg('https://zhenqiang.li/pdf/zaijidulizhangjin.pdf', this.state.current).then((canvas) => {
      this.setState({canvas: canvas});
    });
  }
  
  handleScaleChange(e) {
    console.log('App#handleScaleChange %o', e.target.value);
    this.board.viewport.transform.scaleX = Number(e.target.value);
    this.setState({ board: this.board });
  }

  handleScaleDown() {
    this.board.viewport.transform.scaleX = this.board.viewport.transform.scaleX - 0.1;
    this.setState({ board: this.board });
  }

  handleScaleUp() {
    this.board.viewport.transform.scaleX = this.board.viewport.transform.scaleX + 0.1;
    this.setState({ board: this.board });
  }

  render () {
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
          <Board data={this.board}></Board>
          <div style={{position: "absolute", top: '0px', left: '0px'}}>
            <input 
              type="text" 
              value={this.board.viewport.transform.scaleX} 
              onChange={ this.handleScaleChange.bind(this) } 
              placeholder="Write a scale number..." />
            <button onClick={this.handleScaleDown.bind(this)}>Scale-</button>
            <button onClick={this.handleScaleUp.bind(this)}>Scale+</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
