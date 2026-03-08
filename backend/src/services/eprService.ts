import db from "../db/knex"
import { v4 as uuid } from "uuid"

const formatDateLabel = (value: unknown) => {
 const date = value instanceof Date ? value : new Date(String(value))
 if (Number.isNaN(date.getTime())) return String(value)

 const dd = String(date.getDate()).padStart(2, "0")
 const mm = String(date.getMonth() + 1).padStart(2, "0")
 const yyyy = date.getFullYear()

 return `${dd}-${mm}-${yyyy}`
}

export const fetchEprsByPerson = async (personId: string) => {

 return db("epr_records as e")
  .leftJoin("users as p", "e.person_id", "p.id")
  .leftJoin("users as ev", "e.evaluator_id", "ev.id")
  .where("e.person_id", personId)
  .select(
   "e.*",
   db.raw("p.name as person_name"),
   db.raw("ev.name as evaluator_name")
  )
  .orderBy("e.period_start", "desc")

}

export const fetchEprsByEvaluator = async (evaluatorId: string) => {

 return db("epr_records as e")
  .leftJoin("users as p", "e.person_id", "p.id")
  .leftJoin("users as ev", "e.evaluator_id", "ev.id")
  .where("e.evaluator_id", evaluatorId)
  .select(
   "e.*",
   db.raw("p.name as person_name"),
   db.raw("ev.name as evaluator_name")
  )
  .orderBy("e.period_start", "desc")

}

export const fetchEprsByPersonForEvaluator = async (personId: string, evaluatorId: string) => {

 return db("epr_records as e")
  .leftJoin("users as p", "e.person_id", "p.id")
  .leftJoin("users as ev", "e.evaluator_id", "ev.id")
  .where("e.person_id", personId)
  .andWhere("e.evaluator_id", evaluatorId)
  .select(
   "e.*",
   db.raw("p.name as person_name"),
   db.raw("ev.name as evaluator_name")
  )
  .orderBy("e.period_start", "desc")

}

export const hasEprsByPersonForEvaluator = async (personId: string, evaluatorId: string) => {
 const record = await db("epr_records")
  .where("person_id", personId)
  .andWhere("evaluator_id", evaluatorId)
  .first("id")

 return Boolean(record)
}

export const fetchUserById = async (id: string) => {
 return db("users")
  .where("id", id)
  .first("id", "role")
}

export const fetchEprById = async (id: string) => {

 return db("epr_records")
  .where("id", id)
  .first()

}

export const insertEpr = async (data: any) => {

 const result = await db("epr_records")
  .insert({
   id: uuid(),
   person_id: data.personId,
   evaluator_id: data.evaluatorId,
   role_type: data.roleType,
   period_start: data.periodStart,
   period_end: data.periodEnd,
   overall_rating: data.overallRating,
   technical_skills_rating: data.technicalSkillsRating,
   non_technical_skills_rating: data.nonTechnicalSkillsRating,
   remarks: data.remarks,
   status: data.status
  })
  .returning("*")

 return result[0]

}

export const patchEpr = async (id: string, data: any) => {

 const updated = await db("epr_records")
  .where("id", id)
  .update({
   period_start: data.periodStart,
   period_end: data.periodEnd,
   overall_rating: data.overallRating,
   technical_skills_rating: data.technicalSkillsRating,
   non_technical_skills_rating: data.nonTechnicalSkillsRating,
   remarks: data.remarks,
   status: data.status
  })
  .returning("*")

 return updated[0]

}


export const fetchEprSummary = async (personId: string) => {

 const aggregates = await db("epr_records")
  .where("person_id", personId)
  .select(
   db.raw('COALESCE(ROUND(AVG(overall_rating), 2), 0)::float as "averageOverallRating"'),
   db.raw('COALESCE(ROUND(AVG(technical_skills_rating), 2), 0)::float as "averageTechnicalRating"'),
   db.raw('COALESCE(ROUND(AVG(non_technical_skills_rating), 2), 0)::float as "averageNonTechnicalRating"'),
   db.raw('COUNT(id)::int as "eprCount"')
  )
  .first()

 const lastThree = await db("epr_records")
  .where("person_id", personId)
  .orderBy("period_start", "desc")
  .limit(3)
  .select(
   db.raw("period_start"),
   db.raw("period_end"),
   db.raw('overall_rating as "overallRating"')
  )

 return {
  averageOverallRating: Number(aggregates?.averageOverallRating ?? 0),
  averageTechnicalRating: Number(aggregates?.averageTechnicalRating ?? 0),
  averageNonTechnicalRating: Number(aggregates?.averageNonTechnicalRating ?? 0),
  eprCount: Number(aggregates?.eprCount ?? 0),
  lastThreePeriods: lastThree.map(r => ({
   periodLabel: `${formatDateLabel(r.period_start)} to ${formatDateLabel(r.period_end)}`,
   overallRating: Number(r.overallRating ?? r.overallrating ?? 0)
  }))
 }

}
