import { createStore, applyMiddleware } from 'redux';
import persistedReducer from './rootReducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

let middleWares = [logger, thunk];

const store = createStore(persistedReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);

export default store;