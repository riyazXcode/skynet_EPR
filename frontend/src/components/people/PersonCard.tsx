import { type Person } from "../../types/people"

interface Props {
 person: Person
 isSelected: boolean
 onSelect: (p: Person) => void
}

export default function PersonCard({ person, isSelected, onSelect }: Props) {
 const badgeClass =
  person.role === "student"
   ? "bg-emerald-50 text-emerald-700"
   : person.role === "instructor"
    ? "bg-sky-50 text-sky-700"
    : "bg-slate-100 text-slate-700"

 const enrollmentStatusClass =
  person.enrollment_status === "active"
   ? "text-emerald-600"
   : person.enrollment_status === "completed"
    ? "text-sky-600"
    : "text-rose-600"

 return (
  <button
   type="button"
   onClick={() => onSelect(person)}
   className={`w-full rounded-2xl border p-3 text-left transition ${
    isSelected
     ? "border-sky-300 bg-sky-50 shadow-sm"
     : "border-sky-100 bg-white hover:border-sky-200 hover:bg-slate-50"
   }`}
  >
   <div className="flex items-start justify-between gap-2">
    <div className="font-semibold text-slate-800">{person.name}</div>
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${badgeClass}`}>{person.role}</span>
   </div>

   <div className="mt-1 truncate text-xs text-slate-500">{person.email}</div>

   <div className="mt-2 text-xs text-slate-600">
    {person.role === "student" && (
     <span>
      {person.course_name || "No course"} -{" "}
      <span className={`font-semibold capitalize ${enrollmentStatusClass}`}>
       {person.enrollment_status || "n/a"}
      </span>
     </span>
    )}

    {person.role === "instructor" && <span>EPRs written: {person.total_eprs_written || 0}</span>}
   </div>
  </button>
 )
}
