import * as React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../../reducers';
import Users from '../Users';

export function createStoreHelper({ initialState = {} } = {}) {
    return createStore(
        combineReducers({ reducers }),
        initialState,
        applyMiddleware(thunk),
    );
}

export const App = () => (
    <Provider store={createStoreHelper()}>
        <Users />
    </Provider>
);

export default App;
