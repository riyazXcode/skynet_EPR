export interface EprRecord {
 id: string
 person_id: string
 evaluator_id: string

 period_start: string
 period_end: string

 overall_rating: number
 technical_skills_rating: number
 non_technical_skills_rating: number

 remarks: string
 status: string
}