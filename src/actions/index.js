// import your npm packages

// keys for actiontypes
export const ActionTypes = {
  FETCH_REPOS: 'FETCH_REPOS',
  ERROR_SET: 'ERROR_SET',
  STAR_CHANGE: 'STAR_CHANGE',
};

const GITHUB_API = 'https://api.github.com/graphql';
const API_KEY = 'YOUR_KEY';

// initialize ApolloClient here

export function fetchRepos(query) {
  return (dispatch) => {
    // fetchRepos query
  };
}

export function addStar(repoID, searchTerm) {
  return (dispatch) => {
    // addStar mutation
  };
}

export function removeStar(repoID, searchTerm) {
  return (dispatch) => {
    // removeStar mutation
  };
}
