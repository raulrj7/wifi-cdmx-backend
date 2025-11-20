import path from 'path';
import { FastifyRequest } from 'fastify';

export class FileValidator {
  static validateFile(request: FastifyRequest) {
    const file = (request as any).file;
    console.log(file);
    
    if (!file) {
      throw new Error('No se envió ningún archivo.');
    }

    const ext = path.extname(file.filename).toLowerCase();
    if (!['.csv', '.xlsx'].includes(ext)) {
      throw new Error(`Tipo de archivo no soportado: ${ext}`);
    }

    return { file, ext };
  }
}
