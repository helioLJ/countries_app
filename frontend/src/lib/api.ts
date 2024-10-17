import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Define interfaces for the country data
interface Country {
  name: string;
  countryCode: string;
  flagUrl: string;
}

interface CountryInfo {
  borderCountries: BorderCountry[];
  populationData: PopulationData[];
  flagUrl: string;
  name: string;
}

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
  flagUrl: string;
}

interface PopulationData {
  year: number;
  value: number;
}

let countriesCache: { [key: string]: { name: string; flagUrl: string } } = {};

export const getCountries = async (): Promise<Country[]> => {
  const response = await api.get("/countries");
  return response.data.map((country: { name: string; countryCode: string }) => ({
    name: country.name,
    countryCode: country.countryCode,
    flagUrl: `https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`,
  }));
};

export const getCountryInfo = async (countryCode: string): Promise<CountryInfo> => {
  // Fetch the country list if the cache is empty
  if (Object.keys(countriesCache).length === 0) {
    const countries = await getCountries();
    countriesCache = countries.reduce(
      (
        acc: { [key: string]: { name: string; flagUrl: string } },
        country: { countryCode: string; name: string; flagUrl: string },
      ) => {
        acc[country.countryCode] = {
          name: country.name,
          flagUrl: country.flagUrl,
        };
        return acc;
      },
      {},
    );
  }

  // Fetch the country details
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${countryCode}`,
  );
  const countryInfo: CountryInfo = await response.json();

  // Add the country name and flag URL from the cache
  return {
    ...countryInfo,
    name: countriesCache[countryCode]?.name || "Unknown Country",
    flagUrl:
      countriesCache[countryCode]?.flagUrl ||
      `https://flagcdn.com/${countryCode.toLowerCase()}.svg`,
    borderCountries: countryInfo.borderCountries.map((border: BorderCountry) => ({
      ...border,
      flagUrl:
        countriesCache[border.countryCode]?.flagUrl ||
        `https://flagcdn.com/${border.countryCode.toLowerCase()}.svg`,
    })),
  };
};
