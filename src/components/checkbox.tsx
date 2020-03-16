import * as Snabbdom from 'snabbdom-pragma'
import xs, { Stream } from 'xstream'
import { SoDOM, SiDOM } from '../../type'

const App = ({ DOM }: SoDOM): SiDOM => {
  // Intent
  const action$ = xs.merge((DOM.select('input') as any).events('change'))

  // Model
  const count$: Stream<boolean> = action$
    .map((ev: any) => ev.target.checked)
    .startWith(false)

  // View
  const view$ = count$.map((toggled) => (
    <div>
      <input type="checkbox">Toggle me</input>
      <p>{toggled ? 'ON' : 'off'}</p>
    </div>
  ))

  // Sinks
  return { DOM: view$ }
}

export default App
