import { Knex } from "knex"

export async function up(knex: Knex) {
 await knex.schema.createTable("users", table => {
  table.uuid("id").primary()
  table.string("name")
  table.string("email").unique()
  table.enum("role", ["student","instructor","admin"])
  table.timestamps(true,true)
 })

 await knex.schema.createTable("courses", table => {
  table.uuid("id").primary()
  table.string("name")
  table.string("license_type")
  table.integer("total_required_hours")
 })

 await knex.schema.createTable("enrollments", table => {
  table.uuid("id").primary()

  table.uuid("student_id")
  table.foreign("student_id").references("users.id")

  table.uuid("course_id")
  table.foreign("course_id").references("courses.id")

  table.date("start_date")
  table.enum("status",["active","completed","dropped"])
 })

 return knex.schema.createTable("epr_records", table => {

  table.uuid("id").primary()

  table.uuid("person_id")
  table.foreign("person_id").references("users.id")

  table.uuid("evaluator_id")
  table.foreign("evaluator_id").references("users.id")

  table.enum("role_type",["student","instructor"])

  table.date("period_start")
  table.date("period_end")

  table.integer("overall_rating")
  table.integer("technical_skills_rating")
  table.integer("non_technical_skills_rating")

  table.text("remarks")

  table.enum("status",["draft","submitted","archived"])

  table.timestamps(true,true)

  table.index(["person_id"])
  table.index(["evaluator_id"])
 })
}

export async function down(knex: Knex) {
 await knex.schema.dropTable("epr_records")
 await knex.schema.dropTable("enrollments")
 await knex.schema.dropTable("courses")
 return knex.schema.dropTable("users")
}