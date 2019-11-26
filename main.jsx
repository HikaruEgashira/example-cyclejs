import { run } from '@cycle/run';
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import { div, button, p, makeDOMDriver } from '@cycle/dom';

function main(stream) {
    // Intent
    const action$ = xs.merge(
        stream.DOM.select('.decrement').events('click').map(ev => -1),
        stream.DOM.select('.increment').events('click').map(ev => +1)
    );

    // Model
    const count$ = action$.fold((acc, x) => acc + x, 0);

    // View
    const view$ = count$.map(count =>
        <div>
            <button className="decrement">decrement</button>
            <button className="increment">increment</button>
            <p>Counter: {count}</p>
        </div>
    );

    // Sinks
    return {
        DOM: view$,
    };
}

run(main, {
    DOM: makeDOMDriver('#main-container')
});
