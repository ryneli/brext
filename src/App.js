import React, { Component } from 'react';
import './App.css';
import Page from './Page';
import MsApi, {msApiUploadFile, msApiUpdateFile, msApiDownloadFile} from './MsApi';
import {RootPath} from './AppState';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      canvas: null,
      scale: 1.0,
      pdfjsWrapper: new PdfjsWrapper(),
    };
  }

  loadPage() {
    this.state.pdfjsWrapper.getPageAsImg('https://zhenqiang.li/pdf/zaijidulizhangjin.pdf', this.state.current).then((canvas) => {
      this.setState({canvas: canvas});
    });
  }
  
  handlePageChange(e) {
    console.log('App#handlePageChange %o', e.target.value);
    this.setState({ current: Number(e.target.value) });
    this.loadPage(this.state.current, () => this.loadPage());
  }

  handlePagePrev(e) {
    console.log('App#handlePagePrev %o', e);
    this.setState({ current: this.state.current - 1 }, () => this.loadPage());
  }

  handlePageNext(e) {
    console.log('App#handlePageNext %o', e);
    this.setState({ current: this.state.current + 1 }, () => this.loadPage());
  }

  handleScaleChange(e) {
    console.log('App#handleScaleChange %o', e.target.value);
    this.setState({ scale: Number(e.target.value) });
  }

  handleScaleDown() {
    this.setState({ scale: this.state.scale - 0.1 });
  }

  handleScaleUp() {
    this.setState({ scale: this.state.scale + 0.1 });
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
          <Page canvas={this.state.canvas} scale={this.state.scale}></Page>
          <WritingLayer></WritingLayer>
          <div style={{position: "absolute", top: '0px', left: '0px'}}>
            <input 
              type="text" 
              value={Number(this.state.current)} 
              onChange={ this.handlePageChange.bind(this) } 
              placeholder="Write a page number..." />
            <button onClick={this.handlePagePrev.bind(this)}>prev</button>
            <button onClick={this.handlePageNext.bind(this)}>next</button>
            <input 
              type="text" 
              value={Number(this.state.scale)} 
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
