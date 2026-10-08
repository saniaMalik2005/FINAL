import Link from "next/link";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";
import WorkoutActions from "@/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">WORKOUT NOT FOUND</h1>

          <p className="mt-4 text-gray-400">
            We couldn't find this workout.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex bg-[#ccff00] px-6 py-3 font-black text-black"
          >
            BACK TO LIBRARY
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-12 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#ccff00]"
        >
          <ArrowLeft size={18} />
          BACK TO LIBRARY
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-[500px] w-full object-cover grayscale"
            />
          </div>

          {/* Details */}
          <div>
            {/* Categories */}
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="border border-[#ccff00]/50 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-black uppercase leading-none md:text-6xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              <div className="bg-[#111111] p-4">
                <p className="text-xs text-gray-500">EQUIPMENT</p>
                <p className="mt-2 text-sm font-bold">
                  {workout.equipment}
                </p>
              </div>

              <div className="bg-[#111111] p-4">
                <p className="text-xs text-gray-500">DIFFICULTY</p>
                <p className="mt-2 text-sm font-bold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="bg-[#111111] p-4">
                <p className="text-xs text-gray-500">SETS</p>
                <p className="mt-2 text-sm font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="bg-[#111111] p-4">
                <p className="text-xs text-gray-500">REPS</p>
                <p className="mt-2 text-sm font-bold">
                  {workout.reps}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-6 border-y border-white/10 py-5">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#ccff00]" />
                <span>{workout.duration} min</span>
              </div>

              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#ccff00]" />
                <span>{workout.caloriesBurned} calories</span>
              </div>

              <div className="flex items-center gap-2">
                <Star size={18} className="text-[#ccff00]" />
                <span>{workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-2xl font-black">HOW TO DO IT</h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 border-b border-white/10 pb-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#ccff00] text-sm font-black text-black">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-gray-400">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}