// currently, this application renders a button, that opens
// the "picture of the day" page by NASA
//
// your have received a requirement to support 2 more
// designs of the button: light mode and a link (check App.css)
//
// how would you solve this?

import React, { Component } from 'react';
import './App.css';
import GetPictureOfTheDayButton from './GetPictureOfTheDayButton'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetPictureOfTheDayButton/>
      </div>
    );
  }
}

export default App;
