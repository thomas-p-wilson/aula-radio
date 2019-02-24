import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    connectRouter,
    routerMiddleware
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
// import promiseMiddleware from './middleware/promise';
// import fetchMiddleware from './middleware/fetch';
import { reducers, sagas } from '../../ducks';
// import { reducer as local } from './decorators/withLocalState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configure(history) {
    // Build the middleware for intercepting and dispatching navigation actions
    const router = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();

    // Build the store
    const store = createStore(
        combineReducers({
            ...reducers,
            /* local, */
            router: connectRouter(history)
        }),
        {},
        composeEnhancers(applyMiddleware(/* fetchMiddleware, promiseMiddleware, */ thunkMiddleware, sagaMiddleware, router))
    );

    sagas.forEach(sagaMiddleware.run);

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers');
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
}
