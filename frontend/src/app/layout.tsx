import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import backgroundImage from "../../public/colorful-world-map-background.png";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Country Info App",
  description: "Explore information about countries around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative min-h-screen">
        <Image
          src={backgroundImage}
          alt="Colorful world map background"
          fill
          priority
          quality={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
            opacity: 0.15,
          }}
        />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
