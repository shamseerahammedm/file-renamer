import filesReducer from './files/filesReducer';
import persistedReducer from './persistedReducer/persistedReducer';

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

const rootReducerConfigured = combineReducers({
  files : filesReducer,
  persistedReducer : persistedReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = persistReducer(persistConfig, rootReducerConfigured);

export default rootReducer;