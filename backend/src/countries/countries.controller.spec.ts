import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            getAvailableCountries: jest.fn(),
            getCountryInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvailableCountries', () => {
    it('should return available countries', async () => {
      const mockCountries = [
        { name: 'USA', code: 'US' },
        { name: 'Canada', code: 'CA' },
      ];
      jest
        .spyOn(service, 'getAvailableCountries')
        .mockResolvedValue(mockCountries);

      const result = await controller.getAvailableCountries();
      expect(result).toEqual(mockCountries);
      expect(service.getAvailableCountries).toHaveBeenCalled();
    });
  });

  describe('getCountryInfo', () => {
    it('should return country info', async () => {
      const mockCountryInfo = {
        borderCountries: ['CA', 'MX'],
        populationData: [{ year: 2021, value: 331002651 }],
        flagUrl: 'us-flag-url',
      };
      jest.spyOn(service, 'getCountryInfo').mockResolvedValue(mockCountryInfo);

      const result = await controller.getCountryInfo('US');
      expect(result).toEqual(mockCountryInfo);
      expect(service.getCountryInfo).toHaveBeenCalledWith('US');
    });
  });
});
