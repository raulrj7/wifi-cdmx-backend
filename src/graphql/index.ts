import { wifiPointResolvers } from '../modules/wifiPoints/wifiPoint.resolver';

export const typeDefs = [
  `
  type WifiPoint {
    id: String!
    wifi_id: String
    program: String
    latitude: Float
    longitude: Float
    district: String
    createdAt: String
  }

  type Query {
    getWifiPoints(limit: Int, skip: Int): [WifiPoint]
    getWifiPointById(id: String!): WifiPoint
  }
  `
];

export const resolvers = {
  Query: {
    ...wifiPointResolvers.Query
  }
};
