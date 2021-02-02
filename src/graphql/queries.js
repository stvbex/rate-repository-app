import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
      repositories(
        after: $after
        first: $first
        orderBy: $orderBy
        orderDirection: $orderDirection
        searchKeyword: $searchKeyword
      ) {
        pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          fullName
          reviewCount
          stargazersCount
          ratingAverage
          forksCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const REPOSITORY =  gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ownerName
      ownerAvatarUrl
      description
      language
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
            }
          }
        }
      }
    }
  }
`

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`