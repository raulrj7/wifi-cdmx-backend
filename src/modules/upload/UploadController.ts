import { UploadService } from "./UploadService";
import { batchInsertQueue } from "../../jobs/batch-insert.queue";

export class UploadController {
    constructor(private readonly service: UploadService) {}

    async handleUpload(req: any, reply: any) {
        const file = await req.file();

        if (!file) {
            return reply.code(400).send({ message: "No se envió archivo" });
        }

        try {
            const processed = await this.service.processFile(file);

            processed.batches.forEach((batch, index) => {
                batchInsertQueue.add({
                    batchNumber: index + 1,
                    data: batch
                });
            });

            return reply.send({
                message: "Archivo procesado y lotes enviados a la cola",
                summary: {
                    total: processed.total,
                    valid: processed.valid,
                    invalid: processed.invalid
                },
                invalidRows: processed.invalidRows
            });

        } catch (err: any) {
            return reply.code(500).send({ error: err.message });
        }
    }
}
