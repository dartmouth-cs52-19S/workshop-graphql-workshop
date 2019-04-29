import { ActionTypes } from '../actions';

const PostReducer = (state = {
  all: [],
  current: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, { current: action.payload });
    default:
      return state;
  }
};

export default PostReducer;
