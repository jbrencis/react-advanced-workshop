import React, { Component } from 'react';

class Cornered extends Component {
  state = {
    position: this.props.position,
    prevPosition: this.props.position,
  }

  static getDerivedStateFromProps({ position }, prevState) {
    if (position !== prevState.prevPosition) {

      return {
        position,
        prevPosition: position,
      };
    }
    return null
  }

  handleClick = (e) => {
    this.setState(state => ({ position: (state.position + 1) % 4 }))
  }

  render() {
    const { position } = this.state;
    const top = position <= 1 ? 100 : window.innerHeight - 100;
    const left = position > 0 && position < 3 ? window.innerWidth - 100 : 100;

    return (
      <div onClick={this.handleClick} style={{
        position: 'absolute',
        left,
        top,
      }}>
        {this.props.children}
      </div>
    )
  }
}

export default Cornered;
