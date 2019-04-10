import React from 'react';
import PropTypes from 'prop-types'
import './Card.css'

const sleep = ms => {
  const start = performance.now()
  while (performance.now() - start < ms) {
    //
  }
}

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

const Card = React.memo(({ value, image, hidden, color, tintColor, hideValue }) => {
  // sleep(rand(40, 150))

  return (
    <div className={hidden ? 'cardContainer hidden' : 'cardContainer'}>
      <div className="flipper">
        <div className="front" style={{'backgroundImage': `url(${image})`}}>
          <div className="tint" style={{ backgroundColor: tintColor }}>
            <div className="cardCorners">
              <div className="NW" style={{ color }}>{value}</div>
              <div className="NE" style={{ color }}>{value}</div>
            </div>
            {
              !hideValue &&
              <div className="cardValue" style={{ color }}>
                {value}
              </div>
            }
            <div className="cardCorners">
              <div className="SW" style={{ color }}>{value}</div>
              <div className="SE" style={{ color }}>{value}</div>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="credits">Planning Poker PWA by <a href="https://twitter.com/vicrazumov">@vicrazumov</a></div>
        </div>
      </div>
    </div>
  )
})

Card.propTypes = {
  value: PropTypes.string.isRequired,
  image: PropTypes.string,
  hidden: PropTypes.bool,
  color: PropTypes.string,
  tintColor: PropTypes.string,
  hideValue: PropTypes.bool,
}

export default Card
