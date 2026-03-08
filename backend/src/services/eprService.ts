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