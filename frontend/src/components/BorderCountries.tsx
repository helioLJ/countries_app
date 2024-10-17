import Link from "next/link";
import Image from "next/image";

type BorderCountry = {
  commonName: string;
  countryCode: string;
  flagUrl: string;
};

type BorderCountriesProps = {
  borderCountries: BorderCountry[];
};

export default function BorderCountries({
  borderCountries,
}: BorderCountriesProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Border Countries:</h2>
      <ul className="flex flex-wrap gap-2">
        {borderCountries.map((country) => (
          <li
            key={country.countryCode}
            className="bg-blue-100 px-3 py-1 rounded-full transition-colors duration-300 hover:bg-blue-200"
          >
            <Link
              href={`/countries/${country.countryCode}`}
              className="text-blue-700 hover:text-blue-900 flex items-center"
            >
              <span>{country.commonName}</span>
              {country.flagUrl && (
                <div className="w-6 h-4 relative ml-2">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.commonName} flag`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
