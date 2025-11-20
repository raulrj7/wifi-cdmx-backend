import mercurius from 'mercurius';
import { typeDefs, resolvers } from '../graphql';
import fastify from 'fastify';
import multipart from '@fastify/multipart';
import uploadRoutes from '../modules/upload/routes';
import { prisma } from './database/prisma';

export async function buildApp() {
  const app = fastify({ bodyLimit: 1024 * 1024 * 1024 });

  // REST
  await app.register(multipart, { limits: { fileSize: 1024 * 1024 * 1024 } });
  await app.register(uploadRoutes, { prefix: '/upload' });

  // GraphQL
  await app.register(mercurius, {
    schema: typeDefs,
    resolvers,
    graphiql: true,
    context: (request) => ({ prisma, request }),
  });

  return app;
}
