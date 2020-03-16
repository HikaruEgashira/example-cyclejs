import * as Snabbdom from 'snabbdom-pragma'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import xs, { Stream } from 'xstream'

import { SoDOM, SiDOM } from '../type'

function main({ DOM }: SoDOM): SiDOM {
  // Intent
  const action$: Stream<number> = xs.merge(
    (DOM.select('.decrement') as any).events('click').map(() => -1),
    (DOM.select('.increment') as any).events('click').map(() => +1)
  )

  // Model
  const count$ = action$.fold((acc, x) => acc + x, 0)

  // View
  const view$ = count$.map((count) => (
    <div>
      <button className="decrement">decrement</button>
      <button className="increment">increment</button>
      <p className="counter">Counter: {count}</p>
    </div>
  ))

  // Sinks
  return {
    DOM: view$,
  }
}

run(main, {
  DOM: makeDOMDriver('#main-container'),
})
