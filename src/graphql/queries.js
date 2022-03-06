export const getCarID = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
    }
  }
`;

export const getCar = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
      type
      latitude
      longitude
      heading

      isActive
      status
      userID
      user {
        id
        username
        email
        orders {
          nextToken
        }

        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        originLatitude
        originLongitude
        destLatitude
        destLongitude
        type
        carID
        userID
        user {
          id
          username
          createdAt
          updatedAt
        }
        car {
          id
          type
          latitude
          longitude
          heading
          isActive
          status
          userID
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
