// currently, this application supports switching for themes only
// however, you were asked to add support for languages as well
// nothing serious: just add one more toggle and translations

import React, { Component } from 'react';
import './App.css';

import { THEMES, ThemeContext } from './themes'
import { LANGUAGES, LanguageContext } from './languages'

import Form from './Form'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: {
        theme: THEMES.DARK,
        toggle: this.toggleTheme,
      },
      language: {
        language: LANGUAGES.EN,
        toggleLanguage: this.toggleLanguage,
      }
    }
  }

  toggleLanguage = () => {
    this.setState(state => ({
      ...state,
      language: {
        ...state.language,
        language: state.language.language === LANGUAGES.EN ? LANGUAGES.RU : LANGUAGES.EN,
      }
    }))
  }

  toggleTheme = () => {
    this.setState(state => ({
      ...state,
      theme: {
        ...state.theme,
        theme: state.theme.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
      }
    }))
  }

  render() {
    return (
      <div className="App">
        <LanguageContext.Provider value={this.state.language}>
          <ThemeContext.Provider value={this.state.theme}>
            <Form/>
          </ThemeContext.Provider>
        </LanguageContext.Provider>
      </div>
    );
  }
}

export default App;
