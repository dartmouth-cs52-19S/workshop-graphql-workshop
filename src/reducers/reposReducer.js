import { ActionTypes } from '../actions';

const ReposReducer = (state = {
  repos: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REPOS:
      return Object.assign({}, state, { repos: action.payload });
    default:
      return state;
  }
};

export default ReposReducer;
