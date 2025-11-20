import { batchInsertQueue } from "./batch-insert.queue";
import { prisma } from "../core/database/prisma";
import * as dotenv from "dotenv";

dotenv.config();

batchInsertQueue.process(async (job) => {
    const { batchNumber, data } = job.data;

    try {
        const preparedData = data.map((item: any) => ({
            wifi_id: item.wifi_id != null ? String(item.wifi_id) : null,
            program: item.program ?? null,
            latitude: item.latitude != null ? Number(item.latitude) : null,
            longitude: item.longitude != null ? Number(item.longitude) : null,
            district: item.district ?? null
        }));

        await prisma.wifiPoint.createMany({
            data: preparedData,
            skipDuplicates: true
        });

        console.log(`Batch ${batchNumber} insertado correctamente`);
        return { success: true };

    } catch (error) {
        console.error("Error en batch:", batchNumber, error);
        throw error;
    }
});
