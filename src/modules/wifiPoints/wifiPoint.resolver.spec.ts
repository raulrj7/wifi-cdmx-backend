import { wifiPointResolvers } from './wifiPoint.resolver';
import { wifiPointService } from './wifiPoint.service';
import { verifyToken } from '../../core/middleware/auth';

jest.mock('../../core/middleware/auth');
jest.mock('./wifiPoint.service');

describe('wifiPointResolvers', () => {
  const context = { request: {} };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getWifiPoints llama al servicio con paginación', async () => {
    (wifiPointService.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);
    (verifyToken as jest.Mock).mockReturnValue(true);

    const result = await wifiPointResolvers.Query.getWifiPoints({}, { limit: 10, skip: 0 }, context);

    expect(result).toEqual([{ id: 1 }]);
    expect(wifiPointService.findAll).toHaveBeenCalledWith(10, 0);
    expect(verifyToken).toHaveBeenCalledWith(context.request);
  });

  it('getWifiPointById llama al servicio con id correcto', async () => {
    (wifiPointService.findById as jest.Mock).mockResolvedValue({ id: 2 });
    (verifyToken as jest.Mock).mockReturnValue(true);

    const result = await wifiPointResolvers.Query.getWifiPointById({}, { id: 2 }, context);

    expect(result).toEqual({ id: 2 });
    expect(wifiPointService.findById).toHaveBeenCalledWith(2);
    expect(verifyToken).toHaveBeenCalledWith(context.request);
  });
});
