import * as Snabbdom from 'snabbdom-pragma'
import xs, { Stream } from 'xstream'

import { SoDOM, SiDOM } from '../../type'

/**
 * ----- +1 --- -1 -- +1 ---- +1 --- -1 ------
 */
const intent = ({ DOM }: SoDOM): Stream<number> =>
  xs.merge(
    (DOM.select('.decrement') as any).events('click').map(() => -1),
    (DOM.select('.increment') as any).events('click').map(() => +1)
  )

/**
 * 0---- 1 ---- 0 --- 1 ----- 2 ---- 1 ------
 */
const model = (key$: Stream<number>) => key$.fold((acc, x) => acc + x, 0)

const view = (state$: Stream<number>) => {
  return state$.map((count: number) => (
    <div>
      <button className="decrement">decrement</button>
      <button className="increment">increment</button>
      <p>Counter: {count}</p>
    </div>
  ))
}

const main = (sources: any): SiDOM => {
  const key$ = intent(sources.Keydown)
  const state$ = model(key$)
  const vtree$ = view(state$)
  return {
    DOM: vtree$,
  }
}

export default main
