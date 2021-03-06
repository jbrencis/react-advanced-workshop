// probably, you've already noticed that we're using
// a stupid uncontrollable player and it requires to preserve its nature
//
// add the playback controls (play/pause) to the App component
// (advanced tasks if you have already solved this with ref forwarding)
// ADVANCED 1: use callback for that
// ADVANCED 2: don't forward refs - make imperative declarative!

import React, { Component } from 'react';
import './App.css';
import StupidUncontrollablePlayer from './StupidUncontrollablePlayer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StupidUncontrollablePlayer/>
      </div>
    );
  }
}

export default App;
