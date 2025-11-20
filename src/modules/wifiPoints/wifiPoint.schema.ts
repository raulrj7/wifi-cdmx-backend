export const wifiPointTypeDefs = `
type WifiPoint {
  id: Int!
  wifi_id: String
  program: String
  latitude: Float
  longitude: Float
  district: String
}

type WifiPointList {
  total: Int!
  data: [WifiPoint!]!
}

type Query {
  getWifiPoints(limit: Int, skip: Int): WifiPointList!
  getWifiPointById(id: Int!): WifiPoint
  getWifiPointsByDistrict(district: String!, limit: Int, skip: Int): WifiPointList!
  getWifiPointsByProximity(lat: Float!, lon: Float!, limit: Int, skip: Int): WifiPointList!
  getWifiPointsByWifiId(wifi_id: String!, limit: Int, skip: Int): WifiPointList!
}
`;
