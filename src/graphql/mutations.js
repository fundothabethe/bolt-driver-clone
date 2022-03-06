export const createCar = /* GraphQL */ `
  mutation CreateCar(
    $input: CreateCarInput!
    $condition: ModelCarConditionInput
  ) {
    createCar(input: $input, condition: $condition) {
      id
      type
      userID
      latitude
      longitude
      heading
      createdAt
      updatedAt
      isActive
    }
  }
`;

export const updateCar = /* GraphQL */ `
  mutation UpdateCar(
    $input: UpdateCarInput!
    $condition: ModelCarConditionInput
  ) {
    updateCar(input: $input, condition: $condition) {
      id
      type
      userID
      latitude
      longitude
      heading
      createdAt
      updatedAt
      isActive
    }
  }
`;

export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
        email
      }
    }
  }
`;
