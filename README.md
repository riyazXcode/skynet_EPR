# Skynet EPR – AIRMAN Full-Stack Technical Assessment

A full-stack web application implementing a **mini Skynet EPR (Electronic Progress & Performance Record)** system for flight training academies.

The system allows administrators and instructors to track **student performance, instructor evaluations, and training progress** through structured performance records.

This project was built as part of the **AIRMAN Full-Stack Engineer Internship Technical Assessment**.

---

# Project Overview

Flight training organizations must track the progress and performance of student pilots and instructors across multiple evaluation periods.

The **Skynet EPR system** enables:

• browsing students and instructors
• tracking course enrollments
• creating structured performance evaluations
• analyzing progress trends
• generating AI-assisted remarks

The application provides a **simple dashboard-style interface** for exploring people, viewing performance records, and managing evaluations.

---

# Architecture

```id="q7mf5g"
React Frontend
      │
      │ REST API
      ▼
Node.js + Express Backend
      │
      ▼
PostgreSQL Database
```

The backend exposes REST APIs that power the frontend UI.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Knex.js (query builder & migrations)

Additional tools

* dotenv (environment configuration)
* uuid (ID generation)
* morgan (API request logging)

---

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios (API requests)

---

# Features Implemented

## Level 1 – Core EPR System

### People Directory

Browse all users in the system.

Students display

* course enrollment
* enrollment status

Instructors display

* number of EPRs written

Filtering options

* role filter (student / instructor)
* search by name or email

---

### EPR Records

View performance records for each person.

Each record contains

* evaluation period
* overall rating
* technical skills rating
* non-technical skills rating
* remarks
* record status

---

### EPR Management

Create new EPR records and update existing ones.

Validation rules

* rating range: 1–5
* period end must be after period start

---

## Level 2 – Advanced Features

### Performance Analytics

Endpoint provides summary statistics for a person:

* average overall rating
* average technical rating
* average non-technical rating
* total EPR count
* last three evaluation periods

---

### AI-Assisted Remarks

A rule-based assistant generates suggested remarks based on rating inputs.

Example usage:

```id="r4o3gq"
POST /api/epr/assist
```

Returns a recommended evaluation comment that instructors can use while writing EPRs.

---

### Simplified Role Behavior

The system supports three user roles:

* student
* instructor
* admin

Role behavior rules

Students

* can view only their own EPR records

Instructors

* can create EPR records
* can view records they evaluate

Admins

* full access

Authentication is simplified using request headers.

---

# Project Structure

```id="xv3b6u"
project-root
│
├ backend
│
│  ├ src
│  │   ├ controllers
│  │   ├ services
│  │   ├ routes
│  │   ├ middleware
│  │   ├ db
│  │   ├ utils
│  │   ├ types
│  │   └ index.ts
│  │
│  ├ migrations
│  ├ seeds
│  ├ knexfile.ts
│  └ .env
│
├ frontend
│
│  ├ src
│  │   ├ components
│  │   ├ pages
│  │   ├ api
│  │   ├ hooks
│  │   └ types
│  │
│  └ vite.config.ts
│
└ README.md
```

---

# Database Schema

## Users

Stores all people in the system.

Fields

* id
* name
* email
* role
* created_at
* updated_at

Roles

```id="k5l4q1"
student
instructor
admin
```

---

## Courses

Stores flight training courses.

Fields

* id
* name
* license_type
* total_required_hours

Example

* Private Pilot License (PPL)
* Commercial Pilot License Integrated (CPL)

---

## Enrollments

Links students to courses.

Fields

* id
* student_id
* course_id
* start_date
* status

Status values

```id="n09v38"
active
completed
dropped
```

---

## EPR Records

Electronic Progress & Performance Records.

Fields

* id
* person_id
* evaluator_id
* role_type
* period_start
* period_end
* overall_rating
* technical_skills_rating
* non_technical_skills_rating
* remarks
* status
* created_at
* updated_at

Indexes

* person_id
* evaluator_id
* (period_start, period_end)

---

# Backend Setup

## 1. Install Dependencies

```id="f6azvt"
cd backend
npm install
```

---

## 2. Configure Environment Variables

Create `.env`

```id="i4pckk"
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=skynet_epr
```

---

## 3. Create Database

Open PostgreSQL and run

```id="n4ptpn"
CREATE DATABASE skynet_epr;
```

---

## 4. Run Migrations

```id="fjhvd2"
npx knex migrate:latest
```

Creates all database tables.

---

## 5. Seed Database

```id="6i0kv6"
npx knex seed:run
```

Seed data includes

* instructors
* students
* courses
* enrollments
* sample EPR records

---

## 6. Start Backend Server

```id="hwhbop"
npm run dev
```

Server runs at

```id="ibpsf5"
http://localhost:5000
```

---

# Frontend Setup

## Install Dependencies

```id="h1l91t"
cd frontend
npm install
```

---

## Start Development Server

```id="sv0m8g"
npm run dev
```

Frontend runs at

```id="x52qzy"
http://localhost:5173
```

---

# API Endpoints

## People Directory

```id="x3nfe4"
GET /api/people
```

Query parameters

```id="l2ck7j"
role=student | instructor
search=<name or email>
```

Returns users with course or evaluation metadata.

---

## EPR Records

List records

```id="nxjqjv"
GET /api/epr?personId=<id>
```

Get single record

```id="trrsv0"
GET /api/epr/:id
```

Create record

```id="d5bskt"
POST /api/epr
```

Update record

```id="j4e0lh"
PATCH /api/epr/:id
```

---

## Performance Summary

```id="zby7ff"
GET /api/epr/summary/:personId
```

Returns aggregated performance statistics.

---

## AI Assist

```id="39t2t8"
POST /api/epr/assist
```

Generates suggested evaluation remarks.

---

# API Response Format

Success

```id="w9ewt3"
{
  success: true,
  data: {...}
}
```

Error

```id="ewscg8"
{
  success: false,
  error: "message"
}
```

---

# Logging

API requests are logged using Morgan middleware.

Example

```id="6xjo4s"
GET /api/people 200 14ms
```

---

# AI Usage

AI tools were used during development for

* scaffolding project structure
* generating migration templates
* drafting SQL queries
* assisting with documentation

All generated code was reviewed and modified to ensure correctness and maintainability.

---

# Future Improvements

Possible enhancements

* JWT authentication
* pagination and filtering improvements
* advanced analytics dashboards
* instructor performance insights
* real LLM integration for AI remarks

---

# Author

Mohammed Riyaz Khan
Full-Stack Developer
