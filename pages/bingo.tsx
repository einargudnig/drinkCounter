import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import shuffle from 'shuffle-array'
import Fireworks from '../components/newConfetti'

// const getFromStorage = (key) => {
//   if (typeof window !== 'undefined') {
//     return JSON.parse(window.localStorage.getItem(key))
//   }
// }

const bingoThings = [
  'Someone falls',
  'Someone pukes',
  'Someone gets a beer',
  'Someone gets a wine',
  'Someone gets a cocktail',
  'We see a fight',
  'Flying bratwurst',
  'Someone gets a bratwurst',
  'Someone tries to speak german',
  'Someone gets a pretzel',
  'One of us gets a free drink',
  'Someone goes home unusually early',
  'Everyone start to sing',
  'All of us get a free drink ',
  'Someone drops a beer',
  'It rains',
  'Someone wears a costume',
  'Prost!',
  'People start to dance',
  'Everyone gets a free drink',
]

const data = shuffle(bingoThings).slice(0, -4)

const newData = data.reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
)

const Bingo: NextPage = () => {
  const [state, setState] = useState({
    bingo_card: [],
    checked: {},
    won: false,
  })
  useEffect(() => {
    const locales = localStorage.getItem('bingo_card')
    console.log({ locales })

    const bingoCard =
      localStorage.getItem('bingo_card') === null
        ? newData
        : JSON.parse(localStorage.getItem('bingo_card'))
    localStorage.setItem('bingo_card', JSON.stringify(bingoCard))

    const checkedState =
      localStorage.getItem('checked') === null
        ? {}
        : JSON.parse(localStorage.getItem('checked'))
    localStorage.setItem('checked', JSON.stringify(checkedState))

    const wonState = JSON.parse(localStorage.getItem('won'))
    if (checkedState) {
      setState({
        bingo_card: bingoCard,
        checked: checkedState,
        won: wonState,
      })
    }
  }, [])
  const isWon = (checked) => {
    const range = [0, 1, 2, 3]
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked[row * 4 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked[row * 4 + column])
        ) ||
      range.every((index) => checked[index * 4 + index]) ||
      range.every((index) => checked[index * 4 + 3 - index])
    )
  }
  const toggle = (id) =>
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] }
      console.log(checked, 'CHECKED')
      // add checked value to localstorage
      localStorage.setItem('checked', JSON.stringify(checked))
      const won = isWon(checked)
      return {
        ...state,
        checked,
        won,
      }
    })

  function Tile({ id, children, onToggle, isSet }) {
    const tileStyle = isSet
      ? 'flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed bg-green-500 truncate'
      : 'flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed truncate'

    return (
      <div id={id} onClick={onToggle} className={tileStyle}>
        {children}
      </div>
    )
  }

  const handleClick = () => {
    // localStorage.removeItem('bingo_card')
    const resetData = data.reduce(
      (data, value, index) => ({ ...data, [index]: value }),
      {}
    )
    localStorage.setItem('checked', JSON.stringify({}))
    localStorage.setItem('bingo_card', JSON.stringify(resetData))
    setState({ bingo_card: resetData, checked: {}, won: false })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-screen">
      <Head>
        <title>Bingo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-10">Bingo</h1>

        <div className="flex">
          <a
            href="/"
            className="flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent mb-10"
          >
            Back to counter
          </a>
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent mb-10"
          >
            Randomize tiles
          </button>
        </div>

        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-screen mb-5">
          {Object.keys(state.bingo_card).map((id) => (
            <Tile
              key={id}
              id={id}
              isSet={state.checked[id] ?? false}
              onToggle={() => toggle(id)}
            >
              {state.bingo_card[id]}
            </Tile>
          ))}
        </div>
        {state.won ? <Fireworks /> : null}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://einargudni.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="text-2xl">☕</span>
        </a>
      </footer>
    </div>
  )
}

export default Bingo
