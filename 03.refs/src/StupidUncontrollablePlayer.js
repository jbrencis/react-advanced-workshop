import React from 'react';

// callback implementation
const StupidUncontrollablePlayer = ({ setRef }) => {
  return <audio src="/bensound-jazzyfrenchy.mp3" ref={setRef} />
}

export default StupidUncontrollablePlayer;