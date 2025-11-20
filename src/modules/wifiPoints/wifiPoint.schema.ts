import { gql } from "apollo-server-core";

export const wifiPointTypeDefs = gql`
    type WifiPoint {
        id: Int!
        wifi_id: String
        colonia: String
        alcaldia: String
        latitud: Float
        longitud: Float
        tipo: String
        estatus: String
    }

    type Query {
        getWifiPoints(limit: Int, skip: Int): [WifiPoint!]!
        getWifiPointById(id: Int!): WifiPoint
    }
`;
