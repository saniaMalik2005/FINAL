"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load workouts:", error);
        setLoading(false);
      });
  }, []);

  function getSortedWorkouts() {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      sorted.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      sorted.sort(
        (a, b) =>
          Number(b.caloriesBurned) -
          Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      sorted.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return sorted;
  }

  if (loading) {
    return (
      <section
        id="library"
        className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:px-16"
      >
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />
        </div>
      </section>
    );
  }

  const sortedWorkouts = getSortedWorkouts();

  return (
    <section
      id="library"
      className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:px-16"
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-3 text-4xl font-black">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort */}
        <div className="relative w-full md:w-52">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full appearance-none border border-white/20 bg-[#111111] px-4 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccff00]"
          />
        </div>
      </div>

      {/* Workout Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedWorkouts.map((workout) => (
          <Link
            href={`/workout/${workout.id}`}
            key={workout.id}
            className="group block overflow-hidden border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
          >
            <img
              src={workout.image}
              alt={workout.name}
              className="h-56 w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
            />

            <div className="p-5">
              {/* Categories */}
              <div className="mb-3 flex flex-wrap gap-2">
                {workout.muscleGroups
                  ?.slice(0, 2)
                  .map((muscle) => (
                    <span
                      key={muscle}
                      className="border border-[#ccff00]/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                    >
                      {muscle}
                    </span>
                  ))}
              </div>

              {/* Name */}
              <h3 className="text-xl font-black uppercase">
                {workout.name}
              </h3>

              {/* Equipment */}
              <p className="mt-2 text-sm text-gray-500">
                {workout.equipment}
              </p>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4 text-xs">
                <div>
                  <p className="text-gray-500">TIME</p>
                  <p className="mt-1 font-bold">
                    {workout.duration} min
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">CAL</p>
                  <p className="mt-1 font-bold">
                    {workout.caloriesBurned}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">RATING</p>
                  <p className="mt-1 font-bold">
                    {workout.rating}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}