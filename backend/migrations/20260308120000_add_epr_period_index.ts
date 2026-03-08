import { Knex } from "knex"

export async function up(knex: Knex) {
 await knex.schema.alterTable("epr_records", (table) => {
  table.index(["period_start", "period_end"], "idx_epr_records_period_range")
 })
}

export async function down(knex: Knex) {
 await knex.schema.alterTable("epr_records", (table) => {
  table.dropIndex(["period_start", "period_end"], "idx_epr_records_period_range")
 })
}

