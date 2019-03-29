import { useReducer, useRef, useCallback } from 'react'

import {
  DEFAULT_TRANSITION_TIMING,
  SCREEN_WIDTH,
  INDEX_CHANGE_THRESHOLD,
  ONE_CARD_TRANSITION_TIMING,
  MULTIPLE_CARDS_TRANSITION_TIMING,
  FAST_SWIPE_THRESHOLD,
} from './constants'

const initialState = {
  transformX: 0,
  transitionTiming: 0,
  index: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'scroll':
      return { ...state, ...action.payload }
    case 'setIndex':
      return { ...state, index: action.payload }
    default:
      return state
  }
}

function useSwiper(maxTransform) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { transformX, transitionTiming, index } = state

  const startX = useRef(0)
  const startTime = useRef(0)
  const clientX = useRef(0)

  const scroll = (transformX, transitionTiming) => dispatch({
    type: 'scroll',
    payload: {
      transformX,
      transitionTiming,
    }
  })

  const handleTouchStart = useCallback(event => {
    const { touches: [{ clientX: _clientX }] } = event
    startX.current = _clientX
    startTime.current = new Date().getTime()
  }, [])

  const handleTouchEnd = useCallback(() => {
    const relativeTransform = (transformX + clientX.current) / SCREEN_WIDTH

    let newIndex = index

    const moveTime = new Date().getTime() - startTime.current

    if (moveTime <= FAST_SWIPE_THRESHOLD || Math.abs(relativeTransform) >= INDEX_CHANGE_THRESHOLD) {
      if (relativeTransform > 0) {
        newIndex += Math.min(Math.round(-relativeTransform), -1)
      } else if (relativeTransform < 0) {
        newIndex += Math.max(Math.round(-relativeTransform), 1)
      }
    }

    handleIndexChange(newIndex)
  }, [transformX, index])

  const handleTouchMove = useCallback(event => {
    const { touches: [{ clientX: _clientX }] } = event
    const offset = _clientX - startX.current
    const newOffset = offset - clientX.current

    if (newOffset > 0 || newOffset < maxTransform) return

    scroll(newOffset, DEFAULT_TRANSITION_TIMING)
  }, [])

  const handleIndexChange = useCallback(newIndex => {
    clientX.current = newIndex * SCREEN_WIDTH

    const diff = Math.abs(newIndex - index)
    const delay = diff > 1 ? diff * MULTIPLE_CARDS_TRANSITION_TIMING : ONE_CARD_TRANSITION_TIMING

    dispatch({ type: 'setIndex', payload: newIndex })
    scroll(-clientX.current, delay)
  }, [])

  const listStyle = {
    transform: `translateX(${transformX}px)`,
    transition: `transform ease-in-out ${transitionTiming}ms`
  }

  const handlers = {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleIndexChange,
  }

  return { handlers, index, listStyle, transformX }
}

export default useSwiper;
