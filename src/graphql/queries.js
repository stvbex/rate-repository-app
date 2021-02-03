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

export const REPOSITORY = gql`
  query Repository(
    $id: ID!
    $reviewsFirst: Int
    $reviewsAfter: String
  ) {
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
        reviews(
          first: $reviewsFirst
          after: $reviewsAfter
        ) {
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
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
`;

export const AUTHORIZED_USER = gql`
  query AuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
            }
            repository {
              fullName
              url
            }
          }
          cursor
        }
      }
    }
  }
`;