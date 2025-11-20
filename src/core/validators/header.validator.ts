export class HeaderValidator {
    constructor(private required: string[]) {}

    validate(headers: string[]) {
        const missing = this.required.filter(h => !headers.includes(h.toLowerCase()));

        if (missing.length) {
            throw new Error(`Columnas faltantes en el archivo: ${missing.join(", ")}`);
        }
    }
}
