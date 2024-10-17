import Link from "next/link";
import Image from "next/image";

type Country = {
  name: string;
  countryCode: string;
  flagUrl: string;
};

type CountryListProps = {
  countries: Country[];
};

export default function CountryList({ countries }: CountryListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <li
          key={country.countryCode}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link
            href={`/countries/${country.countryCode}`}
            className="block p-4 h-full flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {country.name}
            </span>
            <div className="w-8 h-6 relative">
              <Image
                src={country.flagUrl}
                alt={`${country.name} flag`}
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
                className="rounded"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
