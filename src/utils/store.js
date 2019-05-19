import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './../reducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlesWares = [sagaMiddleware];
let enhancers = applyMiddleware(...middlesWares);

if (process.env.NODE_ENV !== 'production') {
    middlesWares.push(createLogger());
    enhancers = composeWithDevTools(applyMiddleware(...middlesWares));
}   

const store = createStore(rootReducer, enhancers);
sagaMiddleware.run(rootSaga);

export default store;