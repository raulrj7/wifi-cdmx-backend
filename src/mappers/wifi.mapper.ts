export const wifiFieldMapper: Record<string, string> = {
    nombre: "name",
    direccion: "address",
    latitud: "latitude",
    longitud: "longitude",
    velocidad: "speed",
    proveedor: "provider",
};

export function mapRowEStoEN(row: any) {
    const mapped: any = {};

    for (const key of Object.keys(row)) {
        const englishKey = wifiFieldMapper[key.trim().toLowerCase()];
        if (englishKey) {
            mapped[englishKey] = row[key];
        } else {
        }
    }

    return mapped;
}
