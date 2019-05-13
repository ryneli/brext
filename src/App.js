import React, { Component } from 'react';
import './App.css';
import Page from './Page';
import MsApi, {msApiUploadFile, msApiUpdateFile, msApiDownloadFile} from './MsApi';
import {RootPath} from './AppState';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      scale: 1.0,
    };
  }
  
  handleChange(e) {
    console.log('App#handleChange %o', e.target.value);
    this.setState({ current: Number(e.target.value) });
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

  handlePrev(e) {
    console.log('App#handlePrev %o', e);
    this.setState({ current: this.state.current - 1 });
  }

  handleNext(e) {
    console.log('App#handleNext %o', e);
    this.setState({ current: this.state.current + 1 });
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
          <Page pageNumber={this.state.current} scale={this.state.scale}></Page>
          <div style={{position: "absolute", top: '0px', left: '0px'}}>
            <input 
              type="text" 
              value={Number(this.state.current)} 
              onChange={ this.handleChange.bind(this) } 
              placeholder="Write a page number..." />
            <button onClick={this.handlePrev.bind(this)}>prev</button>
            <button onClick={this.handleNext.bind(this)}>next</button>
            <input 
              type="text" 
              value={Number(this.state.scale)} 
              onChange={ this.handleScaleChange.bind(this) } 
              placeholder="Write a scale number..." />
            <button onClick={this.handleScaleDown.bind(this)}>Scale-</button>
            <button onClick={this.handleScaleUp.bind(this)}>Scale+</button>
            <button onClick={msApiUploadFile}>MsapiUpload</button>
            <button onClick={msApiUpdateFile}>MsapiUpdate</button>
            <button onClick={msApiDownloadFile}>MsapiDownload</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
