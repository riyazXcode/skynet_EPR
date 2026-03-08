# Skynet EPR - AIRMAN Technical Assessment

A full-stack mini EPR (Electronic Progress & Performance Record) system for flight training organizations.

## Stack
- Backend: Node.js, Express, TypeScript, Knex, PostgreSQL
- Frontend: React, TypeScript, Vite, Tailwind CSS, Axios

## Implemented Scope

### Level 1 (Core)
- People directory (`/api/people`) with:
  - role filter (`student`/`instructor`)
  - search by name/email
  - student metadata: course + enrollment status
  - instructor metadata: total EPRs written
- EPR APIs:
  - list (`/api/epr?personId=...` or `/api/epr?evaluatorId=...`)
  - detail (`/api/epr/:id`)
  - create (`POST /api/epr`)
  - update (`PATCH /api/epr/:id`)
- Validation:
  - ratings constrained to 1-5
  - `periodEnd >= periodStart`
- Frontend screens:
  - directory with search/filter
  - EPR list/detail modal
  - create new EPR form

### Level 2 (Implemented)
- Progress summary (`GET /api/epr/summary/:personId`)
- Instructor/Student/Admin role behavior (mock header-based access checks)
- AI assist stub (`POST /api/epr/assist`)

## Backend Setup

1. Install deps:
```bash
cd backend
npm install
```

2. Create `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=skynet_epr
```

3. Create database:
```sql
CREATE DATABASE skynet_epr;
```

4. Run migrations and seeds:
```bash
npx knex migrate:latest
npx knex seed:run
```

5. Start backend:
```bash
npm start
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Install deps:
```bash
cd frontend
npm install
```

2. Start app:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Quick Reference

### People
- `GET /api/people`
- Query params:
  - `role=student|instructor`
  - `search=<name-or-email-substring>`

### EPR
- `GET /api/epr?personId=<uuid>`
- `GET /api/epr?evaluatorId=<uuid>`
- `GET /api/epr/:id`
- `POST /api/epr`
- `PATCH /api/epr/:id`

### Summary
- `GET /api/epr/summary/:personId`

### AI Assist
- `POST /api/epr/assist`

## Current UX Notes
- People search/filter is API-driven from the frontend (`/api/people` query params are used directly).
- Loading indicators are shown while directory/EPR data is loading.
- Success/error toast notifications are shown for create/update EPR actions.

## AI Usage
AI tools were used for scaffolding and iteration support. All generated code was reviewed and adjusted manually.
