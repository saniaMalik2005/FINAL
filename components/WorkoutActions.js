"use client";

import { useState } from "react";

export default function WorkoutActions({ workout }) {
  const [message, setMessage] = useState("");

  function handleAdd() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    if (existingPlan.some((item) => item.id === workout.id)) {
      setMessage("Already in today's plan");
      return;
    }

    if (existingPlan.length >= 5) {
      setMessage("Today's plan is full");
      return;
    }

    const updatedPlan = [
      ...existingPlan,
      {
        ...workout,
        done: false,
      },
    ];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setMessage("Workout added to today's plan!");
  }

  function handleSave() {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    if (existingSaved.some((item) => item.id === workout.id)) {
      setMessage("Already saved for later");
      return;
    }

    const updatedSaved = [
      ...existingSaved,
      workout,
    ];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setMessage("Workout saved for later!");
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-[#ccff00] px-6 py-4 font-black text-black transition hover:bg-white"
        >
          ADD TO TODAY'S PLAN
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex-1 border border-white/20 px-6 py-4 font-black text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          SAVE FOR LATER
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm font-bold text-[#ccff00]">
          {message}
        </p>
      )}
    </div>
  );
}