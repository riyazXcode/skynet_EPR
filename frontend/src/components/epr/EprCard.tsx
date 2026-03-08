import { type EprRecord } from "../../types/epr"

interface Props {
 record: EprRecord
 selectedRole?: "student" | "instructor" | "admin"
 onSelect: (r: EprRecord) => void
}

const formatDate = (value: string) => {
 const date = new Date(value)
 if (Number.isNaN(date.getTime())) return value

 const dd = String(date.getDate()).padStart(2, "0")
 const mm = String(date.getMonth() + 1).padStart(2, "0")
 const yyyy = date.getFullYear()

 return `${dd}-${mm}-${yyyy}`
}

const statusClassMap: Record<string, string> = {
 draft: "bg-amber-50 text-amber-700 border-amber-200",
 submitted: "bg-emerald-50 text-emerald-700 border-emerald-200",
 archived: "bg-slate-100 text-slate-700 border-slate-200"
}

export default function EprCard({ record, selectedRole, onSelect }: Props) {
 const statusClass = statusClassMap[record.status] || "bg-slate-100 text-slate-700 border-slate-200"
 const isInstructorView = selectedRole === "instructor"

 return (
  <button
   type="button"
   onClick={() => onSelect(record)}
   className="w-full rounded-2xl border border-sky-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
  >
   <div className="mb-2 flex items-center justify-between gap-2">
    <div className="text-sm font-semibold text-slate-800">
     {isInstructorView ? (record.person_name || "Student") : `${formatDate(record.period_start)} to ${formatDate(record.period_end)}`}
    </div>
    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${statusClass}`}>
     {record.status}
    </span>
   </div>

   {isInstructorView && (
    <div className="mb-2 text-xs font-semibold text-slate-500">
     {formatDate(record.period_start)} to {formatDate(record.period_end)}
    </div>
   )}

   <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
    <div>
     <div className="text-[11px] text-slate-400">Overall</div>
     <div className="text-base font-bold text-slate-800">{record.overall_rating}</div>
    </div>
    <div>
     <div className="text-[11px] text-slate-400">Technical</div>
     <div className="text-base font-bold text-slate-800">{record.technical_skills_rating}</div>
    </div>
    <div>
     <div className="text-[11px] text-slate-400">Non-Technical</div>
     <div className="text-base font-bold text-slate-800">{record.non_technical_skills_rating}</div>
    </div>
   </div>

   <p className="mt-3 text-xs text-slate-500">{record.remarks || "No remarks yet."}</p>
  </button>
 )
}
