import ApolloClient from 'apollo-boost';
import { GetRepos, AddStar, RemoveStar } from './operations';
/* const ROOT_URL = graphql api key */

// keys for actiontypes
export const ActionTypes = {
  FETCH_REPOS: 'FETCH_REPOS',
  ERROR_SET: 'ERROR_SET',
  STAR_CHANGE: 'STAR_CHANGE'
};

const GITHUB_API = 'https://api.github.com/graphql';
const API_KEY = 'd1d5c0d0a1c52c338b2dfb4e0e098e2c0c638276';

const client = new ApolloClient({
  uri: GITHUB_API,
  headers: { authorization: `bearer ${API_KEY}` },
});


export function fetchRepos(query) {
  console.log("fetching reops agains",  query)
  return (dispatch) => {
    client.query({
      query: GetRepos,
      variables: {
        queryString: query,
      },
    })
      .then((response) => {
        const repos = response.data.search.edges[0].node.repositories.edges.map(repo => repo.node)
        dispatch({ type: ActionTypes.FETCH_REPOS, payload: repos });
      })
      .catch((error) => {
        console.log("heres an erroe", error)
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function addStar(repoID, searchTerm) {
  return (dispatch) => {
    client.mutate({
      mutation: AddStar,
      variables: {
        id: repoID,
      },
    })
      .then((res) => {
        dispatch(fetchRepos(searchTerm))
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function removeStar(repoID, searchTerm) {
  return (dispatch) => {
    client.mutate({
      mutation: RemoveStar,
      variables: {
        id: repoID,
      },
    })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_REPOS, payload: {} });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
