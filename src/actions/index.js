import axios from 'axios';

/* const ROOT_URL = graphql api key */

// keys for actiontypes
export const ActionTypes = {
  FETCH_RESULTS: 'FETCH_RESULTS',
  ERROR_SET: 'ERROR_SET',
};

/* Function based off example found on the Lab 4 page on CS52.me */
export function fetchResults() {
  return (dispatch) => {
    axios.get('/posts')
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, error });
      });
  };
}


// export function createPost(post, history) {
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/posts`, post)
//       .then((response) => {
//         dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
//         history.push('/');
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }

// export function updatePost(post) {
//   return (dispatch) => {
//     axios.put(`${ROOT_URL}/posts/${post.id}`, post)
//       .then((response) => {
//         dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }

// export function fetchPost(id) {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/posts/${id}`)
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }

// export function deletePost(id, history) {
//   return (dispatch) => {
//     axios.delete(`${ROOT_URL}/posts/${id}`)
//       .then((response) => {
//         dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
//         history.push('/');
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }
