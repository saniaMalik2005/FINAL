# FitLog — Workout Library

FitLog is a dark, responsive workout library and workout planning web application. Users can browse workouts, view detailed exercise information, add workouts to today's plan, save workouts for later, and track their daily workout progress.

## Live Demo

Add your deployed Vercel or Netlify URL here after deployment.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- REST API
- LocalStorage

## Features

- Browse all workouts from the FitLog API
- Responsive workout library for mobile, tablet, and desktop
- Workout details page with instructions and specifications
- Add workouts to today's plan
- Save workouts for later
- Maximum five workouts in today's plan
- Mark workouts as completed
- Remove workouts from the plan
- Remove saved workouts
- Live Plan and Saved counters in the navbar
- Sort workouts by duration, calories, or rating
- LocalStorage persistence
- Toast notifications for user actions
- Responsive mobile navigation
- Loading animation
- Custom 404 page

## API

Primary API:

https://api.abcz.workers.dev/api/fitlog

Single workout:

https://api.abcz.workers.dev/api/fitlog/:id

Alternative API:

https://api.api-store.workers.dev/api/fitlog

## Project Structure

```text
fitlog/
├── app/
│   ├── my-plan/
│   │   └── page.js
│   ├── workout/
│   │   └── [id]/
│   │       └── page.js
│   ├── layout.js
│   ├── loading.js
│   ├── not-found.js
│   └── page.js
│
├── components/
│   ├── Footer.js
│   ├── Navbar.js
│   ├── WorkoutActions.js
│   └── WorkoutLibrary.js
│
├── context/
│   └── FitLogContext.js
│
├── public/
├── package.json
└── README.md