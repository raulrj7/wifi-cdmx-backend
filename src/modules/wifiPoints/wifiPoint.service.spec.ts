import { WifiPointService } from './wifiPoint.service';

describe('WifiPointService', () => {
  let service: WifiPointService;

  const prismaMock = {
    wifiPoint: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(() => {
    service = new WifiPointService(prismaMock as any); // inyectamos el mock
  });

  it('debe devolver todos los puntos de wifi con paginación', async () => {
    const mockData = [
      { id: 1, wifi_id: 'ABC', program: 'Programa A', latitude: 19, longitude: -99, district: 'Cuauhtemoc' },
    ];
    prismaMock.wifiPoint.count.mockResolvedValue(1);
    prismaMock.wifiPoint.findMany.mockResolvedValue(mockData);

    const result = await service.findAll(10, 0);
    expect(result).toEqual({ total: 1, data: mockData });
    expect(prismaMock.wifiPoint.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
  });

  it('debe devolver un punto de wifi por id', async () => {
    const mockPoint = { id: 1, wifi_id: 'ABC', program: 'Programa A', latitude: 19, longitude: -99, district: 'Cuauhtemoc' };
    prismaMock.wifiPoint.findUnique.mockResolvedValue(mockPoint);

    const result = await service.findById(1);
    expect(result).toEqual(mockPoint);
    expect(prismaMock.wifiPoint.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
