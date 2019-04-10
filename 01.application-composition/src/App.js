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
        <GetPictureOfTheDayButton>
          {
            (handleClick) => (<button className="gpodButton" onClick={handleClick}>Get picture of the day</button>)
          }
        </GetPictureOfTheDayButton>

        <GetPictureOfTheDayButton>
          {
            (handleClick) => (<button className="gpodLightButton" onClick={handleClick}>Get picture of the day</button>)
          }
        </GetPictureOfTheDayButton>

        <GetPictureOfTheDayButton>
          {
            (handleClick) => (<a className="gpodLink" onClick={handleClick} href="#">Get picture of the day</a>)
          }
        </GetPictureOfTheDayButton>
      </div>
    );
  }
}

export default App;
