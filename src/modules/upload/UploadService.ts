import { CsvParser } from "../../core/parsers/CSVParser";
import { ExcelParser } from "../../core/parsers/ExcelParser";
import { HeaderValidator } from "../../core/validators/header.validator";
import { RowValidator } from "../../core/validators/row.validator";
import { BatchService } from "../../core/batching/batch.service";
import { FileParser } from "../upload/interface";

export class UploadService {
    private parser!: FileParser;
    private headerValidator = new HeaderValidator([
        "latitud",
        "id",
        "programa",
        "longitud",
        "alcaldia"
    ]);

    private rowValidator = new RowValidator();
    private batchService = new BatchService(5000);

    private wifiFieldMapper: Record<string, string> = {
        latitud: "latitude",
        longitud: "longitude",
        id: "wifi_id",
        programa: "program",
        alcaldia: "district"
    };

    async processFile(file: any) {
        const ext = file.filename.split(".").pop()?.toLowerCase();
        const buffer = await file.toBuffer();

        this.parser = this.getParser(ext);

        const { headers, rows } = await this.parser.parse(buffer);

        this.headerValidator.validate(headers);

        const valid: any[] = [];
        const invalid: any[] = [];

        for (const row of rows) {
            const result = this.rowValidator.validate(row);

            if (result.valid) {
                const mappedRow = this.mapRowToEnglish(row);
                valid.push(mappedRow);
            } else {
                invalid.push({
                    ...row,
                    errors: result.errors
                });
            }
        }

        const batches = this.batchService.splitIntoBatches(valid);

        return {
            total: rows.length,
            valid: valid.length,
            invalid: invalid.length,
            invalidRows: invalid,
            batches
        };
    }

    private getParser(ext: string): FileParser {
        if (ext === "csv") return new CsvParser();
        if (ext === "xlsx") return new ExcelParser();
        throw new Error("Tipo de archivo no permitido.");
    }
    private mapRowToEnglish(row: Record<string, any>) {
        const mapped: Record<string, any> = {};

        Object.entries(row).forEach(([key, value]) => {
            const newKey = this.wifiFieldMapper[key] ?? key;
            mapped[newKey] = value;
        });

        return mapped;
    }
}
