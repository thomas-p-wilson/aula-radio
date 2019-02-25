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
import { reducers, sagas } from '../../ducks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configure(history) {
    // Build the middleware for intercepting and dispatching navigation actions
    const router = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();

    // Build the store
    const store = createStore(
        combineReducers({
            ...reducers,
            router: connectRouter(history)
        }),
        {},
        composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware, router))
    );

    sagas.forEach(sagaMiddleware.run);

    return store;
}
