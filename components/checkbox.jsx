import { div, input, p, makeDOMDriver } from '@cycle/dom';
import xs from "xstream";

const App = sources => {
    // Intent
    const action$ = xs.merge(
        sources.DOM.select('input').events('change')
    );

    // Model
    const count$ = action$
        .map(ev => ev.target.checked)
        .startWith(false);

    // View
    const view$ = count$.map(toggled =>
        div([
            input({ attrs: { type: 'checkbox' } }), 'Toggle me',
            p(toggled ? 'ON' : 'off')
        ])
    );

    // Sinks
    return view$;
}

export default App;
