import db from "../db/knex"

export const fetchEprsByPerson = async (personId: string) => {

 return db("epr_records")
  .where("person_id", personId)
  .orderBy("period_start", "desc")

}

export const fetchEprById = async (id: string) => {

 return db("epr_records")
  .where("id", id)
  .first()

}

export const insertEpr = async (data: any) => {

 const result = await db("epr_records")
  .insert({
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
    db.raw("ROUND(AVG(overall_rating), 2) as averageOverallRating"),
    db.raw("ROUND(AVG(technical_skills_rating), 2) as averageTechnicalRating"),
    db.raw("ROUND(AVG(non_technical_skills_rating), 2) as averageNonTechnicalRating"),
    db.raw("COUNT(id) as eprCount")
  )
  .first()

 const lastThree = await db("epr_records")
  .where("person_id", personId)
  .orderBy("period_start", "desc")
  .limit(3)
  .select(
   db.raw("period_start"),
   db.raw("period_end"),
   db.raw("overall_rating as overallRating")
  )

 return {
  ...aggregates,
  lastThreePeriods: lastThree.map(r => ({
   periodLabel: `${r.period_start} → ${r.period_end}`,
   overallRating: r.overallRating
  }))
 }

}