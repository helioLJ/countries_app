import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-cover bg-center" style={{backgroundImage: "url('/world-map-background.png')"}}>
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-800">
          Country Info App
        </h1>
        <Link
          href="/countries"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          View Countries
        </Link>
      </div>
    </main>
  );
}