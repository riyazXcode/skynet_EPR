import db from "../db/knex"

export const fetchPeople = async (role?: string, search?: string) => {

 let query = db("users")
  .leftJoin("enrollments", "users.id", "enrollments.student_id")
  .leftJoin("courses", "enrollments.course_id", "courses.id")
  .leftJoin("epr_records", "users.id", "epr_records.evaluator_id")
  .groupBy("users.id", "courses.name", "enrollments.status")

 if (role) {
  query = query.where("users.role", role)
 }

 if (search) {
  query = query.where(function () {
   this.whereILike("users.name", `%${search}%`)
   .orWhereILike("users.email", `%${search}%`)
  })
 }

 const result = await query.select(
  "users.id",
  "users.name",
  "users.email",
  "users.role",
  db.raw("courses.name as course_name"),
  db.raw("enrollments.status as enrollment_status"),
  db.raw("COUNT(epr_records.id) as total_eprs_written")
 )

 return result
}