import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(private httpService: HttpService) {}

  async getAvailableCountries() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
    );
    return data;
  }

  async getCountryInfo(countryCode: string) {
    try {
      const [countryInfo, flagData] = await Promise.all([
        this.getCountryInfoFromNager(countryCode),
        this.getFlagData(),
      ]);

      const borderCountries = countryInfo.borders;
      const populationData = await this.getPopulationData(
        countryInfo.commonName,
      );
      const flagUrl = this.findFlagUrl(flagData, countryCode);

      return {
        borderCountries,
        populationData,
        flagUrl,
      };
    } catch {
      throw new NotFoundException(
        `Country information not found for ${countryCode}`,
      );
    }
  }

  private async getCountryInfoFromNager(countryCode: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
      ),
    );
    return data;
  }

  private async getPopulationData(countryName: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          country: countryName,
        },
      ),
    );
    return data.data.populationCounts;
  }

  private async getFlagData() {
    const { data } = await firstValueFrom(
      this.httpService.get(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
      ),
    );
    return data.data;
  }

  private findFlagUrl(flagData: any[], countryCode: string) {
    const country = flagData.find((c) => c.iso2 === countryCode);
    return country ? country.flag : null;
  }
}
