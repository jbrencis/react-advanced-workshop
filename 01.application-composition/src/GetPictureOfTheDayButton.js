import React, { Component } from 'react';

// render prop implementation
class GetPictureOfTheDayButton extends Component {
  do() {
    window.open('https://apod.nasa.gov/apod/astropix.html', '_blank');
  }

  render() {
    return this.props.children(this.do)
  }
}

export default GetPictureOfTheDayButton;