// import { useState } from 'react'
import { Buttons } from 'components/Buttons'
// import { MiscButton } from 'components/MiscButton'
import { FunctionComponent } from 'react'
import Head from 'next/head'
// import useSound from 'use-sound'

type Props = {}

const Index: FunctionComponent<Props> = () => {
  // const [playbackRate, setPlaybackRate] = useState(0.75)
  // const soundUrl = '/prost.mp3'
  // const [play] = useSound(soundUrl, {
  //   playbackRate,
  //   volume: 0.25,
  // })

  // const handleClick = () => {
  //   setPlaybackRate(playbackRate + 0.1)
  //   play()
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-screen">
      <Head>
        <title>Cheers!!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-10">
          Budafest christmas shopping 2022!
        </h1>
        <p className="flex">
          {/* <button
            className=" text-xl flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent"
            onClick={handleClick}
          >
            Prost 🔉
          </button> */}
          <button
            className=" text-xl flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent"
            onClick={() => window['__toggleDarkMode']()}
          >
            Change theme
          </button>
          <a
            href="/bingo"
            className="text-xl flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent"
          >
            Bingo!
          </a>
        </p>
        <Buttons />
        {/* <MiscButton /> */}
        <div className="pt-10">
          <small>Sometimes you will need to refresh to see the values!</small>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        {/* <a
          className="flex items-center justify-center gap-2"
          href="https://einargudni.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="text-2xl">☕</span>
        </a> */}
        <div className="flex pt-3">
          <p className="pr-1">This event is sponsored by</p>{' '}
          <p className="font-semibold">Vello Ehvert</p>
        </div>
      </footer>
    </div>
  )
}

export default Index
