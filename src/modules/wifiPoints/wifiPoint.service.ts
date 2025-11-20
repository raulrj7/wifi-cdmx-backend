import { prisma } from "../../core/database/prisma";
import { haversineDistance } from "../../core/utils/distance";

export class WifiPointService {
  async findAll(limit = 100, skip = 0) {
    const total = await prisma.wifiPoint.count();
    const data = await prisma.wifiPoint.findMany({
      skip,
      take: limit,
    });
    return { total, data };
  }

  async findById(id: number) {
    return prisma.wifiPoint.findUnique({
      where: { id },
    });
  }

  async findByWifiId(wifi_id: string, limit = 100, skip = 0) {
    const all = await prisma.wifiPoint.findMany({
        where: { wifi_id },
        skip,
        take: limit,
    });
    const total = await prisma.wifiPoint.count({ where: { wifi_id } });
    return { total, data: all };
  }

  async findByDistrict(district: string, limit = 100, skip = 0) {
    const total = await prisma.wifiPoint.count({
      where: { district },
    });
    const data = await prisma.wifiPoint.findMany({
      where: { district },
      skip,
      take: limit,
    });
    return { total, data };
  }

  async findByProximity(lat: number, lon: number, limit = 100, skip = 0) {
    const points = await prisma.wifiPoint.findMany();
    // Calcular distancia para cada punto
    const withDistance = points.map(p => ({
      ...p,
      distance: p.latitude && p.longitude ? haversineDistance(lat, lon, p.latitude, p.longitude) : Infinity,
    }));
    // Ordenar por distancia
    const sorted = withDistance.sort((a, b) => (a.distance! - b.distance!));
    const paginated = sorted.slice(skip, skip + limit);
    return { total: points.length, data: paginated };
  }
}

export const wifiPointService = new WifiPointService();
