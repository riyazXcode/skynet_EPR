import { type Summary } from "../../types/summary"

interface Props {
 summary: Summary
}

export default function PerformanceSummary({ summary }: Props) {
 const periods = summary.lastThreePeriods || []

 return (

  <div className="border rounded p-4 mb-6">

   <h3 className="font-semibold mb-3">
    Performance Summary
   </h3>

   <div className="grid grid-cols-2 gap-2 text-sm">

    <div>
     Avg Overall Rating:
     <span className="ml-1 font-semibold">
      {summary.averageOverallRating}
     </span>
    </div>

    <div>
     Avg Technical Rating:
     <span className="ml-1 font-semibold">
      {summary.averageTechnicalRating}
     </span>
    </div>

    <div>
     Avg Non-Technical Rating:
     <span className="ml-1 font-semibold">
      {summary.averageNonTechnicalRating}
     </span>
    </div>

    <div>
     Total EPRs:
     <span className="ml-1 font-semibold">
      {summary.eprCount}
     </span>
    </div>

   </div>

   <div className="mt-4">

    <div className="font-semibold mb-1">
     Last 3 Period Records
    </div>

    {!periods.length && (
     <div className="text-sm text-gray-600">
      No period records available.
     </div>
    )}

    {periods.map((p, i) => (
     <div key={i} className="text-sm">
      {p.periodLabel} - Overall Rating (this period): {p.overallRating}
     </div>
    ))}

   </div>

  </div>

 )

}
