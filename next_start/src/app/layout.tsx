import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next App Start",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="px-5 md:px-0">
          <nav className="flex justify-between items-center max-w-4xl mx-auto py-10">
            <Link
              href={"/"}
              className=" text-4xl font-bold rounded hover:-rotate-6 active:scale-95 duration-300"
            >
              Home
            </Link>
            <div className="flex items-center font-medium gap-3">
              <Link
                href={"/about"}
                className=" bg-black text-white px-2 py-1 rounded shadow active:scale-95 duration-200"
              >
                About
              </Link>
              <Link
                href={"/contact"}
                className=" bg-black text-white px-2 py-1 rounded shadow active:scale-95 duration-200"
              >
                Contact Us
              </Link>
              <Link
                href={"/events"}
                className=" bg-black text-white px-2 py-1 rounded shadow active:scale-95 duration-300"
              >
                Events
              </Link>
            </div>
          </nav>
          {children}
        </section>
      </body>
    </html>
  );
}
