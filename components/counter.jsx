import { run } from '@cycle/run';
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import { div, button, p, makeDOMDriver, source } from '@cycle/dom';

const intent = (sources) => {
    return xs.merge(
        sources.DOM.select('.decrement').events('click').map(ev => -1),
        sources.DOM.select('.increment').events('click').map(ev => +1)
    );
}

const model = key$ => {
    return key$.fold((acc, x) => acc + x, 0);
}

const view = state$ => {
    return state$.map(count =>
        <div>
            <button className="decrement">decrement</button>
            <button className="increment">increment</button>
            <p>Counter: {count}</p>
        </div>
        // div([
        //     button('.decrement', 'Decrement'),
        //     button('.increment', 'Increment'),
        //     p('Counter: ' + count)
        // ])
    )
}

const main = sources => {
    const key$ = intent(sources.Keydown)
    const state$ = model(key$)
    const vtree$ = view(state$)
    return {
        DOM: vtree$,
    }
}

run(main, {
    DOM: makeDOMDriver('#main-container')
});
