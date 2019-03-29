import { createContext } from 'react';

export const THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const DARK_THEME = {
  button: {
    backgroundColor: 'white',
    color: 'black',
  },
  div: {
    backgroundColor: 'grey',
    color: 'black',
  },
};

const LIGHT_THEME = {
  button: {
    backgroundColor: 'black',
    color: 'white',
  },
  div: {
    backgroundColor: 'black',
    color: 'white',
  },
};

const THEME_MAP = {
  [THEMES.DARK]: DARK_THEME,
  [THEMES.LIGHT]: LIGHT_THEME,
};

export const ThemeContext = createContext({
  theme: THEMES.DARK,
  toggle: () => {},
})

export default (element, theme) => THEME_MAP[theme][element]