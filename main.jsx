import { run } from '@cycle/run';
import xs from 'xstream';
import { makeDOMDriver } from '@cycle/dom';
import { html } from 'snabbdom-jsx';

function main(sources) {
    const vdom$ = xs.of(
        <div>
            <h1>Hello, world</h1>
        </div>
    )
    return {
        DOM: vdom$,
    };
}

run(main, {
    DOM: makeDOMDriver('#main-container')
});
