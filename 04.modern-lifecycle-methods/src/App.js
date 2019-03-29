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

class App extends Component {
  state = {
    picsCount: 10,
    diff: 0,
  }

  handleAddPicturesClick = () => {
    this.setState(state => ({ picsCount: state.picsCount + 10 }));
  }

  render() {
    const { picsCount, diff } = this.state

    return (
      <div key={picsCount} className="App" ref={this.list}>
        {
          Array(picsCount)
            .fill(true)
            .map((i, idx) => (
              <Photo key={`photo-${idx}`} img={images[idx].url}/>
            ))
        }
        <button className="button" onClick={this.handleAddPicturesClick}>Add 10 more</button>
        <div className="diff">{diff}px increase</div>
      </div>
    );
  }
}

export default App;
