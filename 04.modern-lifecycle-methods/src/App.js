// this component is meant to render a list of images, plus:
// - render 10 more pics on button click
// - measure how new pics impacted the container height (see className="diff")
//
// BUT SURPRISE: it doesn't work (though worked on my machine ;))
// 1. add error boundaries to get the source of the error
// 2. measure and show the impact
// 3. preserve the scroll position after loading new images
// 4. add <Cornered/> component, that will:
//    a. wrap button.button and div.diff
//    b. change corner every time we add images
//    c. change corner every time you click it

import React, { Component } from 'react';
import './App.css';

import Photo from './Photo'
import images from './unsplash.json'
import Cornered from './Cornered'
class App extends Component {
  state = {
    picsLoadedRefresh: false,
    picsCount: 10,
    diff: 0,
    prevHeight: 0,
    error: false,
  }

  picsLoaded = 0
  list = React.createRef()

  static getDerivedStateFromError(error) {
    return {
      error: true,
    }
  }

  componentDidCatch(error) {
    console.log('YOU GOT AN ERROR', error)
  }

  handleAddPicturesClick = () => {
    this.setState(state => ({ picsCount: state.picsCount + 10 }))
  }

  handleImageLoaded = () => {
    // another optimization technique: if you store picsLoaded as a state variable
    // you will rerender the <App/> component every time an image loads
    //
    // here, we track number of images loaded in an instance variable and rerender ONLY
    // when all the images are loaded
    //
    // run profiler and compare the two approaches
    this.picsLoaded++
    if (this.picsLoaded === this.state.picsCount) {
      this.setState(state => ({ picsLoadedRefresh: !state.picsLoadedRefresh }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // you don't need getSnapshotBeforeUpdate for task #2, as images load asynchronously
    // and you will not get a proper container size change
    //
    // listen to image loading and fix diff when all the images are loaded
    const { picsLoadedRefresh: prevPicsLoadedRefresh } = prevState
    const { picsLoadedRefresh, prevHeight } = this.state

    if (prevPicsLoadedRefresh !== picsLoadedRefresh) {
      const containerHeight = this.list.current.scrollHeight
      this.setState({ prevHeight: containerHeight, diff: containerHeight - prevHeight })
    }
  }

  render() {
    const { picsCount, diff, error } = this.state

    return error ? <div>ERROR</div> : (
      <div className="App" ref={this.list}>
        {
          Array(picsCount)
            .fill(true)
            .map((i, idx) => (
              <Photo onLoaded={this.handleImageLoaded} key={`photo-${idx}`} img={images[idx].url}/>
            ))
        }
        <Cornered position={picsCount / 10 % 4}>
          <button onClick={this.handleAddPicturesClick}>Add 10 more</button>
          <div>{diff}px increase</div>
        </Cornered>
      </div>
    );
  }
}

export default App;
