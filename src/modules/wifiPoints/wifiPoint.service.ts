import { prisma } from "../../core/database/prisma";

export class WifiPointService {
    async findAll(limit = 100, skip = 0) {
        return prisma.wifiPoint.findMany({
            skip,
            take: limit,
        });
    }

async findById(id: string) {
    return prisma.wifiPoint.findUnique({
        where: { id: Number(id) },
    });
}
}

export const wifiPointService = new WifiPointService();
