import { combineReducers } from 'redux';
import PostReducer from './postReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
});

export default rootReducer;
