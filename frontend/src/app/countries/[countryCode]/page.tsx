import Image from "next/image";
import { getCountryInfo } from "@/lib/api";
import BorderCountries from "@/components/BorderCountries";
import PopulationChart from "@/components/PopulationChart";
import Link from "next/link";

export default async function CountryPage({
  params,
}: {
  params: { countryCode: string };
}) {
  const countryInfo = await getCountryInfo(params.countryCode);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link
        href="/countries"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Countries
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          <div className="w-16 h-10 relative mr-4 shadow-sm">
            <Image
              src={countryInfo.flagUrl}
              alt={`${countryInfo.name} flag`}
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
              className="rounded"
            />
          </div>
          {countryInfo.name}
        </h1>
        <div className="mb-8">
          <BorderCountries borderCountries={countryInfo.borderCountries} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PopulationChart populationData={countryInfo.populationData} />
          </div>
        </div>
      </div>
    </div>
  );
}
