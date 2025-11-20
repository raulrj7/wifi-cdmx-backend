export class RowValidator {
    validate(row: any): { valid: boolean; errors?: string[] } {
        const errors: string[] = [];

        if (!row.id) errors.push("El campo 'id' es obligatorio");
        if (!row.programa) errors.push("El campo 'programa' es obligatorio");
        if (!row.latitud || isNaN(row.latitud)) errors.push("Latitud inválida");
        if (!row.longitud || isNaN(row.longitud)) errors.push("Longitud inválida");
        if (!row.alcaldia) errors.push("El campo 'alcaldia' es obligatorio");

        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
