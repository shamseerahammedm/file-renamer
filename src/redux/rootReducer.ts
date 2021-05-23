import filesReducer from './files/filesReducer';
import { combineReducers } from 'redux';

const rootReducerConfigured = combineReducers({
  files : filesReducer
});

export default rootReducerConfigured;