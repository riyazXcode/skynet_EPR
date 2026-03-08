# Skynet EPR - AIRMAN Technical Assessment

Mini full-stack EPR (Electronic Progress & Performance Record) application for flight training workflows.

## Tech Stack
- Backend: Node.js, Express, TypeScript, PostgreSQL, Knex
- Frontend: React, TypeScript, Vite, Tailwind CSS, Axios

## What Is Implemented

### Level 1 (Core) - Implemented
- Data model + migrations for:
  - `users`
  - `courses`
  - `enrollments`
  - `epr_records`
- Seed data for instructors, students, courses, enrollments, EPR records
- Directory API:
  - `GET /api/people`
  - query params: `role`, `search`
- EPR APIs:
  - `GET /api/epr?personId=...`
  - `GET /api/epr/:id`
  - `POST /api/epr`
  - `PATCH /api/epr/:id`
- Core validation:
  - ratings in range `1-5`
  - `periodEnd >= periodStart`
- Frontend:
  - People directory
  - Person detail panel
  - EPR list
  - EPR detail modal + edit
  - New EPR modal

### Level 2 (Options) - Implemented
- Option A (Progress Summary & Analytics):
  - `GET /api/epr/summary/:personId`
  - frontend Performance Summary card
- Option B (Mini Role-Based UX):
  - demo session picker (`student` / `instructor` / `admin`)
  - role-based frontend behavior
  - backend role checks using mock headers
- Option C (AI Assist Stub):
  - `POST /api/epr/assist`
  - Generate Suggestion in create/edit EPR forms

## How To Run

### 1) Install Dependencies

Backend:
```bash
cd backend
npm install
# or
pnpm install
```

Frontend:
```bash
cd frontend
npm install
# or
pnpm install
```

### 2) Database Setup

Create PostgreSQL database:
```sql
CREATE DATABASE skynet_epr;
```

Create backend env file: `backend/.env`
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=skynet_epr
```

### 3) Run Migrations

```bash
cd backend
npx knex migrate:latest
```

### 4) Seed Data

```bash
cd backend
npx knex seed:run
```

### 5) Start Backend

```bash
cd backend
npm run dev
# or
pnpm dev
```

Backend URL: `http://localhost:5000`

### 6) Start Frontend

```bash
cd frontend
npm run dev
# or
pnpm dev
```

Frontend URL: `http://localhost:5173`

## API Overview

- People Directory: `GET /api/people`
- EPR List/Detail: `GET /api/epr`, `GET /api/epr/:id`
- EPR Create/Update: `POST /api/epr`, `PATCH /api/epr/:id`
- Summary: `GET /api/epr/summary/:personId`
- AI Assist: `POST /api/epr/assist`

## How I Used AI in This Project (Completely Hand Written Section, No AI!)

### For Backend
- First of all, for starting with this project. I needed ChatGPT and Codex. I used ChatGPT for designing architecture and brainstorming with contstains and ideas.
- Once the whole architecture is set, after making necessary changes. I lock the design and start working on backend first. And also get a postman collection json from the ChatGPT for all the APIs we going to work with.
- Starting with spreading the basic boilerplate and then making necessary changes.
- I repeat the cycle during development of APIs:
- 1) I start a feature.
- 2) Go through the given code for that feature one by one. And paste it in the editor.
- 3) Make sure it works. if it doesn't I try to figure out which line is responsible for the error. If I find it, I fix it. If I can't then, I ask codex to analyse that line or the whole context responsible. It provides a solution. I fix it.
- 4) Check the endpoint working in postman and make sure it works and handles edge cases properly.
- 5) Rinse and repeat for the backend till. Every API is done and tested.

### For Frontend
- After all the backend is completed, I get the architecture context message from ChatGPT and paste it to the codex context which is present in my ide.
- I make it analyse it once again.
- I ask ChatGPT to give me the implementation notes for frontend. And start with the boilerplate.
- 1) Similarly, I implement feature by feature. 
- 2) First I make sure the UI is capable of providing the core functionality. Don't bother about UI attractiveness.
- 3) After every feature is over, I ask codex to analyse the whole context and provide me with the clean and good UI.
- Wind up

### Finallyy
- Just randomly go play with the project to check usability. If something feels wrong. I solve it using codex.
- This is how I completed this task under 13 Hours (Morning: 8:00 AM to 9:00 PM)

