import { prisma } from "../../core/database/prisma";
import { haversineDistance } from "../../core/utils/distance";

export class WifiPointService {
  constructor(private prismaClient = prisma) {} // permite inyectar un mock en tests

  async findAll(limit = 100, skip = 0) {
    const total = await this.prismaClient.wifiPoint.count();
    const data = await this.prismaClient.wifiPoint.findMany({
      skip,
      take: limit,
    });
    return { total, data };
  }

  async findById(id: number) {
    return this.prismaClient.wifiPoint.findUnique({
      where: { id },
    });
  }

  async findByWifiId(wifi_id: string, limit = 100, skip = 0) {
    const data = await this.prismaClient.wifiPoint.findMany({
      where: { wifi_id },
      skip,
      take: limit,
    });
    const total = await this.prismaClient.wifiPoint.count({ where: { wifi_id } });
    return { total, data };
  }

  async findByDistrict(district: string, limit = 100, skip = 0) {
    const total = await this.prismaClient.wifiPoint.count({
      where: { district },
    });
    const data = await this.prismaClient.wifiPoint.findMany({
      where: { district },
      skip,
      take: limit,
    });
    return { total, data };
  }

  async findByProximity(lat: number, lon: number, limit = 100, skip = 0) {
    const points = await this.prismaClient.wifiPoint.findMany();
    const withDistance = points.map(p => ({
      ...p,
      distance: p.latitude && p.longitude ? haversineDistance(lat, lon, p.latitude, p.longitude) : Infinity,
    }));
    const sorted = withDistance.sort((a, b) => (a.distance! - b.distance!));
    const paginated = sorted.slice(skip, skip + limit);
    return { total: points.length, data: paginated };
  }
}

export const wifiPointService = new WifiPointService();
