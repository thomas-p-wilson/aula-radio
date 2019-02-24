import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import createStore from './utils/redux/store-builder';

const history = createHistory();
const store = createStore(history);

if (typeof document !== 'undefined') {
    ReactDOM.render(
        <App store={ store } history={ history } />,
        document.getElementById('root')
    );
}
