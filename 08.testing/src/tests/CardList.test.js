import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { SCREEN_WIDTH, INDEX_CHANGE_THRESHOLD, FAST_SWIPE_THRESHOLD } from '../CardList/constants'
import CardList from '../CardList/CardList'
import CARDS from '../CardList/Cards'
import 'jest-dom/extend-expect'

describe('CardList test suite', () => {
  afterEach(cleanup)

  it('renders all cards on start', () => {
    const { getAllByTestId } = render(<CardList />)
    const nodes = getAllByTestId(/card-/)
    expect(nodes.length).toEqual(CARDS.length)
  })

  it('swipes to the next slide if the move is greater than the threshold', () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) - 10, clientY: 0 }] })
    fireEvent.touchEnd(firstChild)

    const cardList = getByTestId('cardlist')

    expect(cardList).toHaveStyle(`transform: translateX(-${SCREEN_WIDTH}px)`)
  })

  it('swipes to the next slide if the move is less than the threshold, but fast enough', () => {

  })

  it('does not change the position if the move is less and slower than the threshold', async () => {

  })

  it('shows pagination on swiping', () => {

  })

  it('hides pagination after swiping', () => {

  })

  it('flips the card on touch', () => {

  })

})