
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    loadCounts();

    window.addEventListener("storage", loadCounts);
    window.addEventListener("fitlog-updated", loadCounts);

    return () => {
      window.removeEventListener("storage", loadCounts);
      window.removeEventListener("fitlog-updated", loadCounts);
    };
  }, []);

  function loadCounts() {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-16">

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center bg-[#ccff00] text-black">
            <Dumbbell size={21} strokeWidth={3} />
          </div>

          <span className="text-xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#library"
            className="text-sm font-bold text-gray-300 transition hover:text-[#ccff00]"
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-bold text-gray-300 transition hover:text-[#ccff00]"
          >
            MY PLAN
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] px-4 py-2 text-xs font-black text-black transition hover:bg-white"
          >
            PLAN
            <span className="flex h-5 min-w-5 items-center justify-center bg-black px-1 text-[10px] text-[#ccff00]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-[#ccff00] px-4 py-2 text-xs font-black text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
          >
            SAVED
            <span className="flex h-5 min-w-5 items-center justify-center bg-[#ccff00] px-1 text-[10px] text-black">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#090909] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">

            <Link
              href="/#library"
              onClick={closeMenu}
              className="border-b border-white/10 py-3 text-sm font-black text-gray-300"
            >
              WORKOUT
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="border-b border-white/10 py-3 text-sm font-black text-gray-300"
            >
              MY PLAN
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="flex items-center justify-between bg-[#ccff00] px-4 py-3 text-sm font-black text-black"
            >
              <span>PLAN</span>

              <span className="flex h-6 min-w-6 items-center justify-center bg-black px-2 text-xs text-[#ccff00]">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="flex items-center justify-between border border-[#ccff00] px-4 py-3 text-sm font-black text-[#ccff00]"
            >
              <span>SAVED</span>

              <span className="flex h-6 min-w-6 items-center justify-center bg-[#ccff00] px-2 text-xs text-black">
                {savedCount}
              </span>
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

