import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export function verifyToken(request: FastifyRequest) {
  try {
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new Error("No token provided");

    const parts = authHeader.split(' ');
    if (parts.length !== 2) throw new Error("Token error");

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) throw new Error("Malformed token");
    console.log(JWT_SECRET);
    

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log(err);
    
    throw new Error("Unauthorized: " + (err as Error).message);
  }
}

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    verifyToken(req);
  } catch (err) {
    reply.status(401).send({ message: "Unauthorized", error: (err as Error).message });
  }
}
