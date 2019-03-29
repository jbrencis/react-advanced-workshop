import React, { Component } from 'react';
import getElementStyle, { ThemeContext } from './themes'

class Form extends Component {
  static contextType = ThemeContext;

  render() {
    return (
      <div style={getElementStyle('div', this.context.theme)}>
        <button
          style={getElementStyle('button', this.context.theme)}
          onClick={this.context.toggle}
        >
          TOGGLE THEME
        </button>
      </div>
    )
  }
}

export default Form;
