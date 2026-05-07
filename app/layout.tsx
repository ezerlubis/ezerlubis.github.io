import type { Metadata } from "next";
import Navbar from "./Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Ebenezer Lubis | Web Developer Portfolio",
  description:
    "Portfolio of Ebenezer Lubis, focused on modern web interfaces, backend integration, database-driven systems, and AI-assisted product ideas.",
  openGraph: {
    title: "Ebenezer Lubis | Web Developer Portfolio",
    description:
      "Selected web, UI, backend, database, and AI projects by Ebenezer Lubis.",
    images: ["/hero-20260508.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
