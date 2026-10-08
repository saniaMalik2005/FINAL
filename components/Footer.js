import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-8 text-white md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center bg-[#ccff00] text-black">
            <Dumbbell size={18} strokeWidth={3} />
          </div>

          <span className="font-black tracking-wide">
            FITLOG
          </span>
        </Link>

        <p className="text-sm text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}