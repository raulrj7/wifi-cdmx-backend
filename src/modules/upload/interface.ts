export interface FileParser {
    parse(buffer: Buffer): Promise<{ headers: string[], rows: any[] }>;
}