import { useClicks, useInsertClicks } from 'db/clicks'
import { FunctionComponent } from 'react'
import { usePrevious } from 'react-use'
import { animated, useSpring } from 'react-spring'

const miscButtons = [
  {
    type: 'dog',
    label: '🐶',
  },
  {
    type: 'bratwurst',
    label: '🌭',
  },
  {
    type: 'pretzel',
    label: '🥨',
  },
]

const from = {
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-fg)',
}

const to = {
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-bg)',
}

export const MiscButton: FunctionComponent = () => {
  const clicks = useClicks()
  const prevClicks = usePrevious(clicks)
  const insertClicks = useInsertClicks()
  const clickedButton = (type: string) => () => insertClicks([{ type }])

  return (
    <div className="mt-4">
      <h3 className="text-center m-2 text-2xl">
        Is it a dog? Is it a bratwurst? Is it a pretzel? Count it!
      </h3>
      <div className="flex justify-center mt-4">
        {miscButtons.map((button) => {
          const clicksForType =
            clicks?.filter((c) => c.type === button.type).length || 0
          const prevClicksForType =
            prevClicks?.filter((c) => c.type === button.type).length || 0
          const [styles, api] = useSpring(() => ({
            ...from,
            config: {
              duration: 200,
            },
          }))

          if (clicksForType !== prevClicksForType) {
            api.start(to)
            setTimeout(() => api.start(from), 200)
          }

          return (
            <animated.button
              key={button.type}
              className="text-4xl m-2 p-2 transition border rounded-lg shadow-md hover:scale-110 hover:border-accent focus:outline-none"
              style={styles}
              onClick={clickedButton(button.type)}
            >
              {button.label} {clicksForType}
            </animated.button>
          )
        })}
      </div>
    </div>
  )
}
