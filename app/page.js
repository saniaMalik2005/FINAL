"use client";

import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      {/* Hero Section */}
      <section className="mx-auto grid min-h-[650px] max-w-[1400px] items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-16">
        
        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:bg-white"
          >
            BROWSE WORKOUTS
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80"
            alt="Man working out in a gym"
            className="h-[450px] w-full object-cover grayscale"
          />
        </div>
      </section>

      {/* Temporary Library Section */}
      <section
        id="library"
        className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:px-16"
      >
        <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          WORKOUTS
        </p>

        <h2 className="mt-3 text-4xl font-black">THE LIBRARY</h2>

        <p className="mt-3 text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
    </main>
  );
}