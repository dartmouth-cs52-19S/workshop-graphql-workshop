import { ActionTypes } from '../actions';

const ResultsReducer = (state = {
  results: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESULTS:
      return Object.assign({}, state, { results: action.payload });
    default:
      return state;
  }
};

export default ResultsReducer;
