import { FastifyInstance } from "fastify";
import { UploadController } from "./UploadController";
import { UploadService } from "./UploadService";
import { authMiddleware } from "../../core/middleware/auth";

export default async function uploadRoutes(app: FastifyInstance) {
    const service = new UploadService();
    const controller = new UploadController(service);
    app.post("/", { preHandler: authMiddleware }, async (req, reply) => {
        return controller.handleUpload(req, reply);
    });
}
