import axios from 'axios';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=t_glasgow';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};

export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}


export function createPost(post, history) {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push('/');
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
