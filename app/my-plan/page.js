"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

export default function MyPlanPage() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const storedPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const storedSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlan(storedPlan);
    setSaved(storedSaved);
  }

  function removeFromPlan(id) {
    const updatedPlan = plan.filter((item) => item.id !== id);

    setPlan(updatedPlan);
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setMessage("Workout removed from today's plan.");
  }

  function removeSaved(id) {
    const updatedSaved = saved.filter(
      (item) => item.id !== id
    );

    setSaved(updatedSaved);
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setMessage("Workout removed from saved.");
  }

  function markAsDone(id) {
    const updatedPlan = plan.map((item) =>
      item.id === id
        ? { ...item, done: true }
        : item
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setMessage("Workout marked as done!");
  }

  const totalMinutes = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, item) =>
      total + Number(item.caloriesBurned || 0),
    0
  );

  const currentItems =
    activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-12 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
              FITLOG
            </p>

            <h1 className="mt-3 text-5xl font-black uppercase">
              MY PLAN
            </h1>

            <p className="mt-4 max-w-xl text-gray-400">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <Link
            href="/#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] px-5 py-3 font-black text-black transition hover:bg-white"
          >
            GO TO WORKOUTS
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-[#111111] p-6">
            <p className="text-xs font-bold tracking-widest text-gray-500">
              EXERCISES
            </p>

            <p className="mt-3 text-4xl font-black">
              {plan.length}
            </p>
          </div>

          <div className="border border-white/10 bg-[#111111] p-6">
            <p className="text-xs font-bold tracking-widest text-gray-500">
              MINUTES
            </p>

            <p className="mt-3 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="border border-white/10 bg-[#111111] p-6">
            <p className="text-xs font-bold tracking-widest text-gray-500">
              CALORIES
            </p>

            <p className="mt-3 text-4xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-4 text-sm font-black ${
              activeTab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            TODAY'S PLAN ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-4 text-sm font-black ${
              activeTab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            SAVED ({saved.length})
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-5 text-sm font-bold text-[#ccff00]">
            {message}
          </p>
        )}

        {/* Empty State */}
        {currentItems.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-black">
              NOTHING HERE YET
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-7 bg-[#ccff00] px-6 py-3 font-black text-black"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="mt-8 grid gap-5">
            {currentItems.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col overflow-hidden border border-white/10 bg-[#111111] md:flex-row"
              >
                {/* Image */}
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-56 w-full object-cover grayscale md:h-auto md:w-64"
                />

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups
                        ?.slice(0, 3)
                        .map((muscle) => (
                          <span
                            key={muscle}
                            className="border border-[#ccff00]/40 px-2 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
                          >
                            {muscle}
                          </span>
                        ))}
                    </div>

                    <h2 className="mt-4 text-2xl font-black uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-6 text-sm">
                      <span>
                        <b>{workout.duration}</b>{" "}
                        min
                      </span>

                      <span>
                        <b>{workout.caloriesBurned}</b>{" "}
                        cal
                      </span>

                      <span>
                        <b>{workout.rating}</b>{" "}
                        rating
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="border border-white/20 px-5 py-3 text-sm font-black transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      VIEW DETAILS
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        disabled={workout.done}
                        className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-black ${
                          workout.done
                            ? "cursor-not-allowed bg-gray-700 text-gray-400"
                            : "bg-[#ccff00] text-black hover:bg-white"
                        }`}
                      >
                        <Check size={16} />

                        {workout.done
                          ? "DONE"
                          : "MARK AS DONE"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeSaved(workout.id)
                      }
                      className="flex h-11 w-11 items-center justify-center border border-white/20 text-gray-400 transition hover:border-red-500 hover:text-red-500"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}