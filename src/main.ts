import { buildApp } from './core/app';
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    const app = await buildApp();

    const PORT = 3000;
    const HOST = '0.0.0.0';

    await app.listen({ port: PORT, host: HOST });

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
  }
}

main();
