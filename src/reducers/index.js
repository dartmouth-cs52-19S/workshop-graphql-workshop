import { combineReducers } from 'redux';
import ReposReducer from './reposReducer';

const rootReducer = combineReducers({
  repos: ReposReducer,
});

export default rootReducer;
