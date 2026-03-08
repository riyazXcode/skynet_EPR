export interface Summary {
 averageOverallRating: number
 averageTechnicalRating: number
 averageNonTechnicalRating: number
 eprCount: number

 lastThreePeriods: {
  periodLabel: string
  overallRating: number
 }[]
}