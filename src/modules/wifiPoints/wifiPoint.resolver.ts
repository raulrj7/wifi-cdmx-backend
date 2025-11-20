import { wifiPointService } from "./wifiPoint.service";

export const wifiPointResolvers = {
    Query: {
        getWifiPoints: (_: any, { limit, skip }: any) =>
            wifiPointService.findAll(limit, skip),

        getWifiPointById: (_: any, { id }: any) =>
            wifiPointService.findById(id),
    },
};
