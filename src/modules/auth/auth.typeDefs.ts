export const authTypeDefs = `
type AuthPayload {
  token: String!
}

type Mutation {
  login(email: String!, password: String!): AuthPayload!
}
`;
