import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 text-white">
      <div className="text-center">

        <p className="text-sm font-bold tracking-[0.3em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mt-4 text-7xl font-black">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-black">
          WORKOUT NOT FOUND
        </h2>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-3 font-black text-black transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          BACK TO HOME
        </Link>

      </div>
    </main>
  );
}