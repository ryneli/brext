import React, { Component } from 'react';
import './App.css';
import Page from './Page';
import MsApi from './MsApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  
  handleChange(e) {
    console.log('App#handleChange %o', e.target.value);
    this.setState({ current: Number(e.target.value) });
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
    if (window.location.pathname === '/msapi') {
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
          <Page pageNumber={this.state.current}></Page>
          <div style={{position: "absolute", top: '0px', left: '0px'}}>
            <input 
              type="text" 
              value={Number(this.state.current)} 
              onChange={ this.handleChange.bind(this) } 
              placeholder="Write a page number..." />
            <button onClick={this.handlePrev.bind(this)}>prev</button>
            <button onClick={this.handleNext.bind(this)}>next</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
