import XLSX from "xlsx";
import { FileParser } from "../../modules/upload/interface";

export class ExcelParser implements FileParser {
    async parse(buffer: Buffer) {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
            defval: ""
        });

        if (!json.length) {
            throw new Error("El archivo XLSX está vacío.");
        }

        const detectedHeaders = Object.keys(json[0]).map((h: string) =>
            h.replace(/\ufeff/g, "").trim().toLowerCase()
        );

        return { headers: detectedHeaders, rows: json };
    }
}
