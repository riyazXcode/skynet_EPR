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

## How I Used AI in This Project

AI tools were used for:
- scaffolding boilerplate structures
- drafting SQL/query patterns
- accelerating UI iteration ideas
- generating and refining documentation text

All AI-assisted code was manually reviewed, adjusted, and validated with local runs/build checks.
