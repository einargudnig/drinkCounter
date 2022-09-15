import { Buttons } from 'components/Buttons'
import { FunctionComponent } from 'react'
import Head from 'next/head'

type Props = {}

const Index: FunctionComponent<Props> = () => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Welcom to Oktoberfest!!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-6xl font-bold mb-10">Welcome to Oktoberfest!!</h1>
      <p className="flex">
        <button
          className="flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent"
          onClick={() => window['__toggleDarkMode']()}
        >
          Change theme
        </button>
        <a
          href="/bingo"
          className="flex items-center justify-center p-2 mx-2 transition-all border rounded-md focus:outline-none text-accent hover:scale-110 hover:border-accent"
        >
          Bingo!
        </a>
      </p>
      {/* <div className="my-6 text-center">
      <h1 className="text-3xl">Welcome to Oktoberfest</h1>
      <h2 className="text-lg"></h2>
    </div> */}
      <Buttons />
    </main>
  </div>
)

export default Index
