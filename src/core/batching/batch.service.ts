export class BatchService {
    constructor(private readonly batchSize: number = 5000) {}

    splitIntoBatches<T>(rows: T[]): T[][] {
        const batches: T[][] = [];

        for (let i = 0; i < rows.length; i += this.batchSize) {
            batches.push(rows.slice(i, i + this.batchSize));
        }

        return batches;
    }
}
