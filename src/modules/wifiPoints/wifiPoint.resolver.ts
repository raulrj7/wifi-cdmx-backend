import { wifiPointService } from "./wifiPoint.service";
import { verifyToken } from "../../core/middleware/auth";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { 
  GetWifiPointsDto,
  GetWifiPointByIdDto,
  GetWifiPointsByWifiIdDto,
  GetWifiPointsByDistrictDto,
  GetWifiPointsByProximityDto
} from "./dto/WifiPointDto";

export const wifiPointResolvers = {
  Query: {
    getWifiPoints: async (_: any, args: any, context: any) => {
      verifyToken(context.request);

      const dto = plainToInstance(GetWifiPointsDto, args);
      await validateOrReject(dto);

      return wifiPointService.findAll(dto.limit, dto.skip);
    },

    getWifiPointById: async (_: any, args: any, context: any) => {
      verifyToken(context.request);

      const dto = plainToInstance(GetWifiPointByIdDto, args);
      await validateOrReject(dto);

      return wifiPointService.findById(Number(dto.id));
    },

    getWifiPointsByWifiId: async (_: any, args: any, context: any) => {
      verifyToken(context.request);

      const dto = plainToInstance(GetWifiPointsByWifiIdDto, args);
      await validateOrReject(dto);

      return wifiPointService.findByWifiId(dto.wifi_id, dto.limit, dto.skip);
    },

    getWifiPointsByDistrict: async (_: any, args: any, context: any) => {
      verifyToken(context.request);

      const dto = plainToInstance(GetWifiPointsByDistrictDto, args);
      await validateOrReject(dto);

      return wifiPointService.findByDistrict(dto.district, dto.limit, dto.skip);
    },

    getWifiPointsByProximity: async (_: any, args: any, context: any) => {
      verifyToken(context.request);

      const dto = plainToInstance(GetWifiPointsByProximityDto, args);
      await validateOrReject(dto);

      return wifiPointService.findByProximity(dto.lat, dto.lon, dto.limit, dto.skip);
    },
  },
};
