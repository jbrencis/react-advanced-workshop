import React from 'react';

const Photo = ({ loadImage }) => {
  const img = loadImage()

  return (
    <div>
      <img className="photo" src={img}/>
    </div>
  )
}

export default Photo;