import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import path from 'path';
import fs from 'fs';

export const buildServer = async () => {
  const fastify = Fastify({ logger: true });

  const uploadDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  await fastify.register(multipart, {
    limits: { fileSize: 50 * 1024 * 1024 },
  });

  return fastify;
};
