import React, { Component } from 'react';

class GetPictureOfTheDayButton extends Component {
  do() {
    window.open('https://apod.nasa.gov/apod/astropix.html', '_blank');
  }

  render() {
    return <button className="gpodButton" onClick={this.do}>Get picture of the day</button>
  }
}

export default GetPictureOfTheDayButton;