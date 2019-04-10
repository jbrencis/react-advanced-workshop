import React from 'react'
import { render, cleanup, fireEvent, act } from 'react-testing-library'
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

  it('swipes to the next slide if the move is greater than the threshold', async () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) - 10, clientY: 0 }] })

    await new Promise(resolve => setTimeout(resolve, FAST_SWIPE_THRESHOLD + 10))

    fireEvent.touchEnd(firstChild)

    const cardList = getByTestId('cardlist')

    expect(cardList).toHaveStyle(`transform: translateX(-${SCREEN_WIDTH}px)`)
  })

  it('swipes to the next slide if the move is less than the threshold, but fast enough', () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) + 10, clientY: 0 }] })
    fireEvent.touchEnd(firstChild)

    const cardList = getByTestId('cardlist')

    expect(cardList).toHaveStyle(`transform: translateX(-${SCREEN_WIDTH}px)`)
  })

  it('does not change the position if the move is less and slower than the threshold', async () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) + 10, clientY: 0 }] })

    await new Promise(resolve => setTimeout(resolve, FAST_SWIPE_THRESHOLD + 10))

    fireEvent.touchEnd(firstChild)

    const cardList = getByTestId('cardlist')

    expect(cardList).toHaveStyle(`transform: translateX(0px)`)
  })

  it('shows pagination on swiping', async () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    // pagination is shown on startup and hidden after 2 sec + .5 sec transition
    await new Promise(resolve => setTimeout(resolve, 2500))

    const pagination = getByTestId('pagination')
    // toBeVisible is not working for some reason
    // expect(pagination).not.toBeVisible()
    expect(pagination).toHaveClass('hidden')

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) - 10, clientY: 0 }] })

    // expect(pagination).toBeVisible()
    expect(pagination).not.toHaveClass('hidden')

    fireEvent.touchEnd(firstChild)
  })

  it('hides pagination after swiping', async () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    const pagination = getByTestId('pagination')

    fireEvent.touchStart(firstChild, { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    fireEvent.touchMove(firstChild, { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) - 10, clientY: 0 }] })

    await new Promise(resolve => setTimeout(resolve, FAST_SWIPE_THRESHOLD + 10))

    fireEvent.touchEnd(firstChild)

    await new Promise(resolve => setTimeout(resolve, 2500))

    // expect(pagination).not.toBeVisible()
    expect(pagination).toHaveClass('hidden')
  })

  it('flips the card on touch', async () => {
    const { container, getByTestId } = render(<CardList />)
    const { firstChild } = container

    const card = getByTestId('card-0')

    // start
    expect(card).not.toHaveClass('hidden')

    // flip
    fireEvent.click(firstChild)

    // animation
    await new Promise(resolve => setTimeout(resolve, 1100))

    expect(card).toHaveClass('hidden')

    // flip back
    fireEvent.click(firstChild)
    await new Promise(resolve => setTimeout(resolve, 1100))

    expect(card).not.toHaveClass('hidden')
  })

})