"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedItems = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedItems) {
      setSaved(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  function addToPlan(workout) {
    if (plan.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Already in today's plan",
      };
    }

    if (plan.length >= 5) {
      return {
        success: false,
        message: "Today's plan is full",
      };
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      {
        ...workout,
        done: false,
      },
    ]);

    return {
      success: true,
      message: "Workout added to today's plan!",
    };
  }

  function saveWorkout(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Already saved for later",
      };
    }

    setSaved((currentSaved) => [...currentSaved, workout]);

    return {
      success: true,
      message: "Workout saved for later!",
    };
  }

  function removeFromPlan(id) {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== id)
    );
  }

  function removeSaved(id) {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item.id !== id)
    );
  }

  function markAsDone(id) {
    setPlan((currentPlan) =>
      currentPlan.map((item) =>
        item.id === id
          ? { ...item, done: true }
          : item
      )
    );
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}