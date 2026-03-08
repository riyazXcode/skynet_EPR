import { Knex } from "knex"
import { v4 as uuid } from "uuid"

export async function seed(knex: Knex) {

  await knex("epr_records").del()
  await knex("enrollments").del()
  await knex("courses").del()
  await knex("users").del()

  // instructors
  const instructor1 = uuid()
  const instructor2 = uuid()
  const instructor3 = uuid()

  // students
  const students = Array.from({ length: 8 }, () => uuid())

  // courses
  const pplCourse = uuid()
  const cplCourse = uuid()

  await knex("users").insert([
    { id: instructor1, name: "Capt. John Walker", email: "john.walker@academy.com", role: "instructor" },
    { id: instructor2, name: "Capt. Sarah Collins", email: "sarah.collins@academy.com", role: "instructor" },
    { id: instructor3, name: "Capt. Michael Reed", email: "michael.reed@academy.com", role: "instructor" },

    { id: students[0], name: "Alex Turner", email: "alex.turner@student.com", role: "student" },
    { id: students[1], name: "Mark Benson", email: "mark.benson@student.com", role: "student" },
    { id: students[2], name: "Liam Carter", email: "liam.carter@student.com", role: "student" },
    { id: students[3], name: "Ryan Parker", email: "ryan.parker@student.com", role: "student" },
    { id: students[4], name: "Daniel Foster", email: "daniel.foster@student.com", role: "student" },
    { id: students[5], name: "Chris Adams", email: "chris.adams@student.com", role: "student" },
    { id: students[6], name: "Noah Hughes", email: "noah.hughes@student.com", role: "student" },
    { id: students[7], name: "Ethan Brooks", email: "ethan.brooks@student.com", role: "student" }
  ])

  await knex("courses").insert([
    {
      id: pplCourse,
      name: "Private Pilot License",
      license_type: "PPL",
      total_required_hours: 45
    },
    {
      id: cplCourse,
      name: "Commercial Pilot License Integrated",
      license_type: "CPL",
      total_required_hours: 200
    }
  ])

  await knex("enrollments").insert([
    { id: uuid(), student_id: students[0], course_id: pplCourse, start_date: "2025-01-10", status: "active" },
    { id: uuid(), student_id: students[1], course_id: pplCourse, start_date: "2025-01-12", status: "active" },
    { id: uuid(), student_id: students[2], course_id: pplCourse, start_date: "2025-01-15", status: "active" },

    { id: uuid(), student_id: students[3], course_id: cplCourse, start_date: "2024-11-01", status: "active" },
    { id: uuid(), student_id: students[4], course_id: cplCourse, start_date: "2024-10-20", status: "active" },
    { id: uuid(), student_id: students[5], course_id: cplCourse, start_date: "2024-10-10", status: "active" },
    { id: uuid(), student_id: students[6], course_id: cplCourse, start_date: "2024-09-15", status: "active" },
    { id: uuid(), student_id: students[7], course_id: cplCourse, start_date: "2024-09-01", status: "active" }
  ])

  await knex("epr_records").insert([
    {
      id: uuid(),
      person_id: students[0],
      evaluator_id: instructor1,
      role_type: "student",
      period_start: "2025-01-10",
      period_end: "2025-02-10",
      overall_rating: 4,
      technical_skills_rating: 4,
      non_technical_skills_rating: 5,
      remarks: "Shows strong progress in basic maneuvers and checklist discipline.",
      status: "submitted"
    },
    {
      id: uuid(),
      person_id: students[1],
      evaluator_id: instructor2,
      role_type: "student",
      period_start: "2025-01-12",
      period_end: "2025-02-12",
      overall_rating: 3,
      technical_skills_rating: 3,
      non_technical_skills_rating: 4,
      remarks: "Needs improvement in radio communication but maintains good situational awareness.",
      status: "submitted"
    },
    {
      id: uuid(),
      person_id: students[3],
      evaluator_id: instructor1,
      role_type: "student",
      period_start: "2024-11-01",
      period_end: "2024-12-01",
      overall_rating: 5,
      technical_skills_rating: 5,
      non_technical_skills_rating: 5,
      remarks: "Excellent flight control and decision making under pressure.",
      status: "submitted"
    },
    {
      id: uuid(),
      person_id: students[4],
      evaluator_id: instructor3,
      role_type: "student",
      period_start: "2024-10-20",
      period_end: "2024-11-20",
      overall_rating: 4,
      technical_skills_rating: 4,
      non_technical_skills_rating: 4,
      remarks: "Solid technical understanding with consistent cockpit discipline.",
      status: "submitted"
    }
  ])

}