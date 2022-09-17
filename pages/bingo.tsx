import type { NextPage } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import shuffle from 'shuffle-array'
import Fireworks from '../components/newConfetti'

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

const data = shuffle(bingoThings)
data.length = data.length - 4
// bingoThings.length = bingoThings.length - 4

const newData = data.reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
)

const Bingo: NextPage = () => {
  const [state, setState] = useState({ checked: {} })
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
      const won = isWon(checked)
      return {
        ...state,
        checked,
        won,
      }
    })

  function Tile({ id, children, onToggle, isSet }) {
    const tileStyle = isSet
      ? 'flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed bg-green-500'
      : 'flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed'

    return (
      <div id={id} onClick={onToggle} className={tileStyle}>
        {children}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Bingo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-10">Bingo</h1>

        <a
          href="/"
          className="flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent mb-10"
        >
          Back to counter
        </a>

        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          {Object.keys(newData).map((id) => (
            <Tile
              key={id}
              id={id}
              isSet={!!state.checked[id]}
              onToggle={() => toggle(id)}
            >
              {newData[id]}
            </Tile>
          ))}
        </div>
        {state.won ? <Fireworks /> : null}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
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
