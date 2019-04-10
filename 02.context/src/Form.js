import React, { Component } from 'react';
import getElementStyle, { ThemeContext } from './themes'
import getTranslation, { LanguageContext } from './languages'

class Form extends Component {
  render() {
    return (
      <LanguageContext.Consumer>
        {language => {
          console.log(language)

          return (
            <ThemeContext.Consumer>
              {theme => (
                <>
                <div style={getElementStyle('div', theme.theme)}>
                  <button
                    style={getElementStyle('button', theme.theme)}
                    onClick={theme.toggle}
                  >
                    {getTranslation('toggleTheme', language.language)}
                  </button>
                </div>
                <div style={getElementStyle('div', theme.theme)}>
                  <button
                    style={getElementStyle('button', theme.theme)}
                    onClick={language.toggleLanguage}
                  >
                    {getTranslation('toggleLanguage', language.language)}
                  </button>
                </div>
                </>
              )}
            </ThemeContext.Consumer>
        )
      }}
      </LanguageContext.Consumer>
    )
  }
}

export default Form;
