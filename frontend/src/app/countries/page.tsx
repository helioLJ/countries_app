import { getCountries } from "@/lib/api";
import CountryList from "@/components/CountryList";
import Link from "next/link";

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-6">Countries</h1>
      <CountryList countries={countries} />
    </div>
  );
}
