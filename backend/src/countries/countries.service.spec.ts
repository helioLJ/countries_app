import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CountriesService } from './countries.service';
import { NotFoundException } from '@nestjs/common';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpService: HttpService;

  const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {
      headers: {} as any,
    } as InternalAxiosRequestConfig,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableCountries', () => {
    it('should return available countries', async () => {
      const mockCountries = [
        { name: 'USA', code: 'US' },
        { name: 'Canada', code: 'CA' },
      ];
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockAxiosResponse(mockCountries)));

      const result = await service.getAvailableCountries();
      expect(result).toEqual(mockCountries);
    });
  });

  describe('getCountryInfo', () => {
    it('should return country info', async () => {
      const mockCountryInfo = {
        borders: ['CA', 'MX'],
        commonName: 'United States',
      };
      const mockFlagData = [{ iso2: 'US', flag: 'us-flag-url' }];
      const mockPopulationData = [{ year: 2021, value: 331002651 }];

      const mockCountryResponse: AxiosResponse = {
        data: mockCountryInfo,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      };
      const mockFlagResponse: AxiosResponse = {
        data: { data: mockFlagData },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      };
      const mockPopulationResponse: AxiosResponse = {
        data: { data: { populationCounts: mockPopulationData } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockCountryResponse));
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockFlagResponse));
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of(mockPopulationResponse));

      const result = await service.getCountryInfo('US');
      expect(result).toEqual({
        borderCountries: ['CA', 'MX'],
        populationData: mockPopulationData,
        flagUrl: 'us-flag-url',
      });
    });

    it('should throw NotFoundException for invalid country code', async () => {
      const mockErrorResponse: AxiosResponse = {
        data: {},
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockErrorResponse));

      await expect(service.getCountryInfo('XX')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
