import { type Summary } from "../../types/summary"

interface Props {
 summary: Summary
}

const toFixed = (value: number) => Number(value || 0).toFixed(2)

export default function PerformanceSummary({ summary }: Props) {
 const periods = summary.lastThreePeriods || []

 return (
  <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
   <div className="mb-4 flex items-center justify-between">
    <h3 className="flex items-center gap-2 text-lg font-semibold">
     <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19h16" />
      <path d="M8 15V9M12 15V5M16 15v-3" />
     </svg>
     Performance Summary
    </h3>
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
     <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
     </svg>
     Analytics
    </span>
   </div>

   <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="text-[11px] uppercase tracking-wide text-slate-400">Avg Overall</div>
     <div className="text-xl font-bold">{toFixed(summary.averageOverallRating)}</div>
    </div>

    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="text-[11px] uppercase tracking-wide text-slate-400">Avg Technical</div>
     <div className="text-xl font-bold">{toFixed(summary.averageTechnicalRating)}</div>
    </div>

    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="text-[11px] uppercase tracking-wide text-slate-400">Avg Non-Tech</div>
     <div className="text-xl font-bold">{toFixed(summary.averageNonTechnicalRating)}</div>
    </div>

    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="text-[11px] uppercase tracking-wide text-slate-400">Total EPRs</div>
     <div className="text-xl font-bold">{summary.eprCount}</div>
    </div>
   </div>

   <div className="mt-4 rounded-xl border border-sky-100 bg-slate-50 p-3">
    <div className="mb-2 text-sm font-semibold text-slate-700">Last 3 Period Records</div>

    {!periods.length && <div className="text-sm text-slate-500">No period records available.</div>}

    {periods.map((period, index) => (
     <div key={index} className="text-sm text-slate-600">
      {period.periodLabel} - Overall Rating: <span className="font-semibold text-slate-800">{period.overallRating}</span>
     </div>
    ))}
   </div>
  </section>
 )
}
