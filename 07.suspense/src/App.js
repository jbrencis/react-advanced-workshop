// check the JS downloaded in the Network tab of DevTools
//
// make <PublicHolidays/> lazy loaded
// and check the Network tab again

import React, { Component, Suspense } from 'react'
import './App.css'

const PublicHolidays = React.lazy(() => import(/* webpackChunkName: "PublicHolidays" */ './PublicHolidays'))

const MODES = {
  CURRENT_DATE: 'CURRENT_DATE',
  PUBLIC_HOLIDAYS: 'PUBLIC_HOLIDAYS',
}

const addLeadingZero = value => value < 10 ? `0${value}` : `${value}`
const formatTime = (date) => {
  const hh = addLeadingZero(date.getHours())
  const mm = addLeadingZero(date.getMinutes())
  const ss = addLeadingZero(date.getSeconds())

  return `${hh}:${mm}:${ss}`
}

class App extends Component {
  state = {
    mode: MODES.CURRENT_DATE,
    time: new Date(),
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.setState({ time: new Date() }))
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  handleToggleModeClick = () => {
    if (this.state.mode === MODES.CURRENT_DATE) {
      this.setState({ mode: MODES.PUBLIC_HOLIDAYS })
    } else {
      this.setState({ mode: MODES.CURRENT_DATE })
    }
  }

  get currentDateRender() {
    return (
      <div>{formatTime(this.state.time)}</div>
    )
  }

  get publicHolidaysRender() {
    return (
      <Suspense fallback={<div>LOADING</div>}>
        <PublicHolidays/>
      </Suspense>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <button onClick={this.handleToggleModeClick}>Toggle mode</button>
        {
          this.state.mode === MODES.CURRENT_DATE ? this.currentDateRender : this.publicHolidaysRender
        }
      </div>
    );
  }
}

export default App;
