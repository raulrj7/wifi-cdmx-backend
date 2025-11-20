import { wifiPointTypeDefs } from '../modules/wifiPoints/wifiPoint.schema';
import { authTypeDefs } from '../modules/auth/auth.typeDefs';
import { wifiPointResolvers } from '../modules/wifiPoints/wifiPoint.resolver';
import { authResolvers } from '../modules/auth/auth.resolvers';

export const typeDefs = [wifiPointTypeDefs, authTypeDefs].join('\n');

export const resolvers = {
  Query: {
    ...wifiPointResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};
