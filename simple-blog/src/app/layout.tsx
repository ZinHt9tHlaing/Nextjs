import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const date = new Date();

export const metadata: Metadata = {
  title: "Simple Share Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body className={inter.className}>
        <section className="w-1/2 mx-auto flex flex-col h-screen">
          <nav className=" flex md:items-center justify-between my-5 md:my-10 border-b border-b-gray-600 pb-3">
            <Link
              href={"/"}
              className="text-3xl font-bold uppercase hover:text-shadow-md duration-200"
            >
              SimpleShare
            </Link>
            <Link
              href={"/posts/create"}
              className=" text-white bg-black text-2xl rounded-md font-medium py-[3px] px-3 w-fit hover:bg-gray-700 active:bg-black active:ring-2 active:ring-gray-700 active:scale-90 duration-200"
            >
              {/* Create new post */}+
            </Link>
          </nav>
          <div className=" mb-10">{children}</div>
          <footer className=" mt-auto text-gray-300 rounded-t bg-black py-2 text-center">
            <p className=" font-semibold text-sm mx-auto">
              Copyright &copy; {date.getFullYear()} by{" "}
              <span className="font-bold text-gray-100">Christ_M@X</span>.
            </p>
          </footer>
        </section>
      </body>
    </html>
  );
}
