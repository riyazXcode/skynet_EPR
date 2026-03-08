interface Props {
 totalEprsWritten: number
 lastReviewedStudentName?: string
}

export default function InstructorStats({ totalEprsWritten, lastReviewedStudentName }: Props) {
 return (
  <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
   <div className="mb-4 flex items-center justify-between">
    <h3 className="flex items-center gap-2 text-lg font-semibold">
     <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18" />
      <path d="M12 3v18" />
     </svg>
     Instructor Activity
    </h3>
   </div>

   <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-slate-400">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
       <path d="M4 4h16v16H4z" />
       <path d="M8 10h8M8 14h8" />
      </svg>
      Total EPRs Written
     </div>
     <div className="text-2xl font-bold">{totalEprsWritten}</div>
    </div>

    <div className="rounded-xl border border-sky-100 bg-slate-50 p-3">
     <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-slate-400">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
       <circle cx="12" cy="8" r="4" />
       <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
      Last EPR Review
     </div>
     <div className="text-sm text-slate-600">
      {lastReviewedStudentName ? <b>{lastReviewedStudentName}</b> : "No reviews yet"}
     </div>
    </div>
   </div>
  </section>
 )
}
