import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
/* const ROOT_URL = graphql api key */

// keys for actiontypes
export const ActionTypes = {
  FETCH_REPOS: 'FETCH_REPOS',
  ERROR_SET: 'ERROR_SET',
};

const GITHUB_API = 'https://api.github.com/graphql';
const API_KEY = 'ddbe66875f0eb34f3ccbea227cdcf49f9855b836';

const client = new ApolloClient({
  uri: GITHUB_API,
  headers: { authorization: `bearer ${API_KEY}` },
});

const GetRepos = gql`
query GetRepos($queryString: String!) {
  search(query: $queryString, type: REPOSITORY, first: 20) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          name
          createdAt
          description
          url
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 10) {
                  totalCount
                  edges {
                    node {
                      ... on Commit {
                        committedDate
                        message
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export function fetchRepos(query) {
  return (dispatch) => {
    client.query({
      query: GetRepos,
      variables: {
        queryString: query,
      },
    })
      .then((response) => {
        const repos = response.data.search.edges.map(repo => repo.node);
        dispatch({ type: ActionTypes.FETCH_REPOS, payload: repos });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.FETCH_REPOS, error });
      });
  };
}
