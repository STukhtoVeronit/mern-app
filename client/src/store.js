import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const initialState = {};

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {
	const { logger } = require(`redux-logger`);

	middlewares.push(logger);
}
//TODO: fix issue with redux-devtools(error if redux-devtool is not installed )
const store = createStore(
		rootReducer, // reducers
		initialState, // our state
		compose( //middleware
				applyMiddleware(...middlewares),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
);

sagaMiddleware.run(rootSaga);

export default store;