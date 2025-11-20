import Queue from "bull";

export const batchInsertQueue = new Queue("batch-insert-queue", {
    redis: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: Number(process.env.REDIS_PORT ?? 6379)
    }
});
