"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#0b0b0b]">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <Dumbbell size={24} />
          <span>FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black"
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-semibold text-white/60 transition hover:text-white"
          >
            MY PLAN
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black"
          >
            PLAN <span>0</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white"
          >
            SAVED <span>0</span>
          </Link>
        </div>

      </nav>
    </header>
  );
}