import { Knex } from "knex"

export async function up(knex: Knex) {
 await knex.schema.alterTable("enrollments", (table) => {
  table.dropForeign(["student_id"])
  table.dropForeign(["course_id"])
 })

 await knex.schema.alterTable("epr_records", (table) => {
  table.dropForeign(["person_id"])
  table.dropForeign(["evaluator_id"])
 })

 await knex.schema.alterTable("enrollments", (table) => {
  table.foreign("student_id").references("users.id").onDelete("CASCADE")
  table.foreign("course_id").references("courses.id").onDelete("CASCADE")
 })

 await knex.schema.alterTable("epr_records", (table) => {
  table.foreign("person_id").references("users.id").onDelete("RESTRICT")
  table.foreign("evaluator_id").references("users.id").onDelete("RESTRICT")
 })
}

export async function down(knex: Knex) {
 await knex.schema.alterTable("enrollments", (table) => {
  table.dropForeign(["student_id"])
  table.dropForeign(["course_id"])
 })

 await knex.schema.alterTable("epr_records", (table) => {
  table.dropForeign(["person_id"])
  table.dropForeign(["evaluator_id"])
 })

 await knex.schema.alterTable("enrollments", (table) => {
  table.foreign("student_id").references("users.id")
  table.foreign("course_id").references("courses.id")
 })

 await knex.schema.alterTable("epr_records", (table) => {
  table.foreign("person_id").references("users.id")
  table.foreign("evaluator_id").references("users.id")
 })
}
