import { createStore, applyMiddleware } from 'redux';
import rootReducerConfigured from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let middleWares = [logger, thunk];

const store = createStore(rootReducerConfigured, applyMiddleware(...middleWares));

export default store;