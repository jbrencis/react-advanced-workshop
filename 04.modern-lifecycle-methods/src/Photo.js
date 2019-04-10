import React from 'react';

const Photo = ({ img, onLoaded }) => {
  return (
    <div>
      <img onLoad={onLoaded} className="photo" src={img}/>
    </div>
  )
}

export default Photo;