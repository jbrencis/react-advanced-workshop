// currently, this application supports switching for themes only
// however, you were asked to add support for languages as well
// nothing serious: just add one more toggle and translations

import React, { Component } from 'react';
import './App.css';

import { THEMES, ThemeContext } from './themes'

import Form from './Form'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: THEMES.DARK,
      toggle: this.toggleTheme,
    }
  }

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    }))
  }

  render() {
    return (
      <div className="App">
        <ThemeContext.Provider value={this.state}>
          <Form/>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
