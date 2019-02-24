import React from 'react';
import PropTypes from 'prop-types';
// import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

const App = ({
    store, history
}) => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div>HEY</div>
        </ConnectedRouter>
    </Provider>
);

App.propTypes = {
    store: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired
};

export default App;
