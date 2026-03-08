import { useMemo, useState } from "react"
import { usePeople } from "../hooks/usePeople"
import PeopleList from "../components/people/PeopleList"
import { type Person } from "../types/people"
import { useEprs } from "../hooks/useEprs"
import EprList from "../components/epr/EprList"
import EprDetailModal from "../components/epr/EprDetailModal"
import { type EprRecord } from "../types/epr"
import EprForm from "../components/epr/EprForm"
import { useSummary } from "../hooks/useSummary"
import PerformanceSummary from "../components/analytics/PerformanceSummary"
import InstructorStats from "../components/instructor/InstructorStats"

export default function DirectoryPage() {
 const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
 const [selectedEpr, setSelectedEpr] = useState<EprRecord | null>(null)
 const [showCreate, setShowCreate] = useState(false)
 const [searchInput, setSearchInput] = useState("")
 const [searchQuery, setSearchQuery] = useState("")
 const [roleFilter, setRoleFilter] = useState("all")
 const [recordSearch, setRecordSearch] = useState("")
 const [statusFilter, setStatusFilter] = useState("all")
 const [sortBy, setSortBy] = useState("period_desc")
 const [showAdminModal, setShowAdminModal] = useState(false)
 const [showPeopleFilterModal, setShowPeopleFilterModal] = useState(false)
 const [eprRefreshKey, setEprRefreshKey] = useState(0)

 const { people, loading, error: peopleError } = usePeople(searchQuery, roleFilter as "all" | "student" | "instructor")
 const { records, loading: eprLoading } = useEprs(selectedPerson?.id, selectedPerson?.role, eprRefreshKey)
 const summary = useSummary(selectedPerson?.role === "student" ? selectedPerson.id : undefined, eprRefreshKey)
 const defaultEvaluatorId = String((import.meta.env?.VITE_USER_ID as string) || "079978da-bedb-46c0-93d4-ed0f5d5be558")

 const filteredRecords = useMemo(() => {
  const query = recordSearch.trim().toLowerCase()

  let next = records.filter((record) => {
   const searchHaystack = `${record.remarks || ""} ${record.person_name || ""} ${record.status} ${record.period_start} ${record.period_end}`.toLowerCase()
   const matchSearch = !query || searchHaystack.includes(query)
   const matchStatus = statusFilter === "all" || record.status === statusFilter

   return matchSearch && matchStatus
  })

  next = [...next].sort((a, b) => {
   if (sortBy === "period_asc") {
    return new Date(a.period_start).getTime() - new Date(b.period_start).getTime()
   }
   if (sortBy === "rating_desc") {
    return b.overall_rating - a.overall_rating
   }
   if (sortBy === "rating_asc") {
    return a.overall_rating - b.overall_rating
   }

   return new Date(b.period_start).getTime() - new Date(a.period_start).getTime()
  })

  return next
 }, [records, recordSearch, statusFilter, sortBy])

 if (loading && people.length === 0) {
  return (
   <div className="dashboard-bg min-h-screen p-8">
    <div className="mx-auto max-w-4xl rounded-2xl border border-sky-100 bg-white/90 p-10 text-center shadow-xl">
     <div className="text-xl font-semibold">Loading dashboard...</div>
    </div>
   </div>
  )
 }

 return (
  <div className="dashboard-bg h-screen overflow-hidden">
   <div className="grid h-screen grid-cols-1 border-sky-100/70 bg-white/85 lg:grid-cols-[300px_minmax(0,1fr)]">
     <aside className="glass-panel flex h-full flex-col overflow-hidden border-b border-sky-100/80 p-4 md:p-5 lg:border-b-0 lg:border-r lg:p-6">
      <div className="mb-5 rounded-2xl bg-gradient-to-r from-sky-700 to-sky-500 px-4 py-4 text-white shadow-lg">
       <div className="text-xl font-bold">AIRMAN</div>
       <div className="text-xs text-sky-100">Academy EPR Console</div>
      </div>

      <div className="mb-3 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
       <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
       </svg>
       People Directory
      </div>

      <div className="mb-3 flex items-center gap-2">
       <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        </span>
        <input
         type="text"
         value={searchInput}
         onChange={(e) => {
          const value = e.target.value
          setSearchInput(value)
          if (!value.trim()) {
           setSearchQuery("")
          }
         }}
         onKeyDown={(e) => {
          if (e.key === "Enter") {
           e.preventDefault()
           setSearchQuery(searchInput.trim())
          }
         }}
         placeholder="Search people..."
         className="w-full rounded-xl border border-sky-100 bg-slate-50/90 py-2 pl-3 pr-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
        />
       </div>
       <button
        type="button"
        onClick={() => setSearchQuery(searchInput.trim())}
        className="inline-flex items-center gap-1 rounded-xl border border-sky-100 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
       >
        <svg className="h-3.5 w-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <circle cx="11" cy="11" r="8" />
         <path d="m21 21-4.3-4.3" />
        </svg>
       </button>
       <button
        type="button"
        onClick={() => setShowPeopleFilterModal(true)}
        className="inline-flex items-center gap-1 rounded-xl border border-sky-100 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
       >
        <svg className="h-3.5 w-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <path d="M3 5h18" />
         <path d="M6 12h12" />
         <path d="M10 19h4" />
        </svg>
       </button>
      </div>

      {peopleError && (
       <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
        {peopleError}
       </div>
      )}

      <div className="soft-scroll min-h-0 flex-1 overflow-y-auto pr-1">
       <PeopleList
        people={people}
        selectedId={selectedPerson?.id}
        onSelect={setSelectedPerson}
       />
      </div>
     </aside>

     <main className="overflow-hidden p-4 md:p-5 lg:p-6">
      <header className="mb-6 rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm">
       <div className="flex items-center">
        <button
         type="button"
         onClick={() => setShowAdminModal(true)}
         className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-100 bg-slate-50 text-sky-700"
        >
         <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
         </svg>
        </button>
       </div>
      </header>

      {!selectedPerson && (
       <section className="rounded-2xl border border-dashed border-sky-200 bg-white/80 p-10 text-center">
        <h2 className="mb-2 text-2xl font-bold">Select a person to view records</h2>
        <p className="text-slate-500">Choose a student or instructor from the left panel.</p>
       </section>
      )}

      {selectedPerson && (
       <section>
        <div className="mb-5 flex flex-wrap items-center gap-3">
         <div>
         <h2 className="text-3xl font-bold leading-tight">{selectedPerson.name}</h2>
          <p className="text-sm font-medium capitalize text-slate-500">{selectedPerson.role}</p>
          {selectedPerson.role === "student" && (
           <p className="text-sm text-slate-500">
            {selectedPerson.course_name || "No course assigned"}
            {selectedPerson.enrollment_status ? ` • ${selectedPerson.enrollment_status}` : ""}
           </p>
          )}
         </div>

         {selectedPerson.role !== "admin" && (
          <button
            onClick={() => setShowCreate(true)}
            className="ml-auto inline-flex items-center gap-1 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700"
          >
           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
           </svg>
           New EPR
          </button>
         )}
        </div>

        {selectedPerson.role === "student" && summary && <PerformanceSummary summary={summary} />}
        {selectedPerson.role === "instructor" && (
         <InstructorStats
          totalEprsWritten={Number(selectedPerson.total_eprs_written || 0)}
          lastReviewedStudentName={records[0]?.person_name}
         />
        )}

        <h3 className="mb-3 mt-6 flex items-center gap-2 text-lg font-semibold">
         <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" />
         </svg>
         {selectedPerson.role === "instructor" ? "Performance Records Created" : "Performance Records"}
        </h3>

        <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-3">
         <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
           </svg>
          </span>
          <input
           type="text"
           value={recordSearch}
           onChange={(e) => setRecordSearch(e.target.value)}
           placeholder={selectedPerson.role === "instructor" ? "Search by student, remarks, period..." : "Search by remarks, period..."}
           className="w-full rounded-xl border border-sky-100 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-sky-300"
          />
         </div>

         <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300"
         >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="archived">Archived</option>
         </select>

         <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300"
         >
          <option value="period_desc">Latest Period</option>
          <option value="period_asc">Oldest Period</option>
          <option value="rating_desc">Highest Rating</option>
          <option value="rating_asc">Lowest Rating</option>
         </select>
        </div>

        {eprLoading && (
         <div className="rounded-xl border border-sky-100 bg-white p-4 text-sm text-slate-500">Loading records...</div>
        )}

        {!eprLoading && (
         <div className="soft-scroll max-h-[40vh] overflow-y-auto pr-1">
          <EprList
           records={filteredRecords}
           selectedRole={selectedPerson.role}
           onSelect={setSelectedEpr}
          />
         </div>
        )}
       </section>
      )}

      {selectedEpr && (
       <EprDetailModal
        record={selectedEpr}
        onClose={() => setSelectedEpr(null)}
        onUpdated={() => setEprRefreshKey((v) => v + 1)}
       />
      )}

      {showCreate && selectedPerson && selectedPerson.role !== "admin" && (
        <EprForm
         personId={selectedPerson.id}
         evaluatorId={defaultEvaluatorId}
        roleType={selectedPerson.role}
        onClose={() => setShowCreate(false)}
        onCreated={() => setEprRefreshKey((v) => v + 1)}
       />
      )}

      {showAdminModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl">
         <div className="mb-3 flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
           <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20a8 8 0 0 1 16 0" />
           </svg>
          </div>
          <div>
           <div className="font-semibold">Demo User</div>
           <div className="text-xs text-slate-500">Role: admin</div>
          </div>
         </div>
         <div className="text-sm text-slate-600">
          This is a demo admin account. In a real application, this area would contain administrative controls and settings.
         </div>
         <div className="mt-4 flex justify-end">
          <button
           type="button"
           onClick={() => setShowAdminModal(false)}
           className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
           Close
          </button>
         </div>
        </div>
       </div>
      )}

      {showPeopleFilterModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl">
         <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <svg className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <path d="M3 5h18" />
           <path d="M6 12h12" />
           <path d="M10 19h4" />
          </svg>
          Filter People
         </div>

         <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
           <input
            type="radio"
            name="roleFilter"
            value="all"
            checked={roleFilter === "all"}
            onChange={(e) => {
             setRoleFilter(e.target.value)
             setShowPeopleFilterModal(false)
            }}
           />
           All Roles
          </label>

          <label className="flex items-center gap-2">
           <input
            type="radio"
            name="roleFilter"
            value="student"
            checked={roleFilter === "student"}
            onChange={(e) => {
             setRoleFilter(e.target.value)
             setShowPeopleFilterModal(false)
            }}
           />
           Students
          </label>

          <label className="flex items-center gap-2">
           <input
            type="radio"
            name="roleFilter"
            value="instructor"
            checked={roleFilter === "instructor"}
            onChange={(e) => {
             setRoleFilter(e.target.value)
             setShowPeopleFilterModal(false)
            }}
           />
           Instructors
          </label>
         </div>

         <div className="mt-4 flex justify-end gap-2">
          <button
           type="button"
           onClick={() => setRoleFilter("all")}
           className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
           Reset
          </button>
          <button
           type="button"
           onClick={() => setShowPeopleFilterModal(false)}
           className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
           Close
          </button>
         </div>
        </div>
       </div>
      )}
     </main>
   </div>
  </div>
 )
}
