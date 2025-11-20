import { parseString } from "@fast-csv/parse";
import { FileParser } from "../../modules/upload/interface";

export class CsvParser implements FileParser {
    parse(buffer: Buffer): Promise<{ headers: string[], rows: any[] }> {
        return new Promise((resolve, reject) => {
            const rows: any[] = [];
            let detected: string[] = [];

            parseString(buffer.toString(), {
                headers: true,
                ignoreEmpty: true,
                trim: true,
            })
                .on("headers", (headers: string[]) => {
                    detected = headers.map((h: string) =>
                        h.replace(/\ufeff/g, "").trim().toLowerCase()
                    );
                })
                .on("data", (row) => rows.push(row))
                .on("error", (err) => reject(err))
                .on("end", () => resolve({ headers: detected, rows }));
        });
    }
}
