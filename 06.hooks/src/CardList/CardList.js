// it's time to improve! here are some areas, that you could check:
// 1. state management in <CardList/>
// 2. module variables in <CardList/> and <Pagination/>
// 3. try useMemo and/or useCallback where needed
// 4. move the swiper logic to a new hook, ideally, make it as decoupled from <CardList/> as possible

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './CardList.css'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'

import CARDS from './Cards'

import {
  LIST_WIDTH,
  MAX_TRANSFORM,
} from './constants'

import useSwiper from './useSwiper'

const CardList = ({ onIndexChange }) => {
  const [hidden, setHidden] = useState(false)
  const { handlers, index, listStyle, transformX } = useSwiper(MAX_TRANSFORM)
  const {
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handleIndexChange
  } = handlers

  return (
    <div
      onTouchStart={!hidden ? handleTouchStart : () => {}}
      onTouchEnd={!hidden ? handleTouchEnd : () => {}}
      onTouchMove={!hidden ? handleTouchMove : () => {}}
      onClick={() => setHidden(prevHidden => !prevHidden)}
    >
      <Pagination
        hidden={hidden}
        cards={CARDS}
        onIndexChange={handleIndexChange}
        activeIndex={index}
        data={transformX}
      />
      <div
        data-testid="cardlist"
        className="cardList"
        style={{
          ...listStyle,
          width: `${LIST_WIDTH}px`,
        }}
      >
        {
          CARDS.map((card, idx) => (
            <Card
              hidden={index === idx && hidden}
              key={`card-${idx}`}
              value={card.value}
              image={card.image}
              color={card.color}
              tintColor={card.tintColor}
              hideValue={card.hideValue}
            />
          ))
        }
      </div>
    </div>
  )
}

CardList.propTypes = {
  onIndexChange: PropTypes.func,
}

export default CardList