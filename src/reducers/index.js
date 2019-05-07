import { combineReducers } from 'redux';
import ResultsReducer from './resultsReducer';

const rootReducer = combineReducers({
  results: ResultsReducer,
});

export default rootReducer;
