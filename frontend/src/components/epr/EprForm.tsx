import { useState } from "react"
import { createEpr, generateAiRemark } from "../../api/eprApi"
import { useToast } from "../common/ToastProvider"

interface Props {
 personId: string
 evaluatorId: string
 roleType: "student" | "instructor"
 onClose: () => void
 onCreated?: () => void
}

export default function EprForm({ personId, evaluatorId, roleType, onClose, onCreated }: Props) {
 const [form, setForm] = useState({
  periodStart: "",
  periodEnd: "",
  overallRating: 3,
  technicalSkillsRating: 3,
  nonTechnicalSkillsRating: 3,
  remarks: "",
  status: "draft"
 })

 const [error, setError] = useState("")
 const [saving, setSaving] = useState(false)
 const [aiLoading, setAiLoading] = useState(false)
 const { showToast } = useToast()

 const handleSubmit = async () => {
  setError("")
  setSaving(true)

  if (!evaluatorId) {
   setError("No instructor found to assign as evaluator.")
   setSaving(false)
   return
  }

  if (!form.periodStart || !form.periodEnd) {
   setError("Period Start and Period End are required.")
   setSaving(false)
   return
  }

  if (form.periodEnd < form.periodStart) {
   setError("Period End must be after Period Start.")
   setSaving(false)
   return
  }

  try {
   await createEpr({
    personId,
    evaluatorId,
    roleType,
    ...form
   })

   showToast("EPR created successfully")
   onCreated?.()
   onClose()
  } catch (err: any) {
   const message = err?.response?.data?.error || "Failed to create EPR"
   setError(message)
   showToast(message, "error")
  } finally {
   setSaving(false)
  }
 }

 const handleAiAssist = async () => {
  setAiLoading(true)

  try {
   const result = await generateAiRemark({
    overallRating: form.overallRating,
    technicalSkillsRating: form.technicalSkillsRating,
    nonTechnicalSkillsRating: form.nonTechnicalSkillsRating
   })

   setForm((prev) => ({
    ...prev,
    remarks: result.suggestedRemarks
   }))
   showToast("Suggested remarks generated")
  } catch {
   showToast("Failed to generate suggested remarks", "error")
  } finally {
   setAiLoading(false)
  }
 }

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 backdrop-blur-sm">
   <div className="w-full max-w-2xl rounded-3xl border border-sky-100 bg-white p-5 shadow-2xl md:p-6">
    <div className="mb-4 flex items-center justify-between">
     <h2 className="text-2xl font-bold">Create New EPR</h2>
     <button
      onClick={onClose}
      className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-600 hover:bg-slate-50"
     >
      Close
     </button>
    </div>

    {error && <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
     <label className="text-sm text-slate-700">
      <div className="mb-1 font-semibold">Period Start</div>
      <input
       type="date"
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.periodStart}
       onChange={(e) => setForm({ ...form, periodStart: e.target.value })}
      />
     </label>

     <label className="text-sm text-slate-700">
      <div className="mb-1 font-semibold">Period End</div>
      <input
       type="date"
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.periodEnd}
       onChange={(e) => setForm({ ...form, periodEnd: e.target.value })}
      />
     </label>

     <label className="text-sm text-slate-700">
      <div className="mb-1 font-semibold">Overall Rating</div>
      <input
       type="number"
       min={1}
       max={5}
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.overallRating}
       onChange={(e) => setForm({ ...form, overallRating: Number(e.target.value) })}
      />
     </label>

     <label className="text-sm text-slate-700">
      <div className="mb-1 font-semibold">Technical Rating</div>
      <input
       type="number"
       min={1}
       max={5}
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.technicalSkillsRating}
       onChange={(e) => setForm({ ...form, technicalSkillsRating: Number(e.target.value) })}
      />
     </label>

     <label className="text-sm text-slate-700 md:col-span-2">
      <div className="mb-1 font-semibold">Non-Technical Rating</div>
      <input
       type="number"
       min={1}
       max={5}
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.nonTechnicalSkillsRating}
       onChange={(e) => setForm({ ...form, nonTechnicalSkillsRating: Number(e.target.value) })}
      />
     </label>

     <label className="text-sm text-slate-700 md:col-span-2">
      <div className="mb-1 flex items-center justify-between">
       <span className="font-semibold">Remarks</span>
       <button
        type="button"
        onClick={handleAiAssist}
        disabled={aiLoading}
        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 disabled:opacity-60"
       >
        {aiLoading ? "Generating..." : "Generate Suggestion"}
       </button>
      </div>
      <textarea
       rows={4}
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.remarks}
       onChange={(e) => setForm({ ...form, remarks: e.target.value })}
      />
     </label>

     <label className="text-sm text-slate-700 md:col-span-2">
      <div className="mb-1 font-semibold">Status</div>
      <select
       className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 outline-none focus:border-sky-300 focus:bg-white"
       value={form.status}
       onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
       <option value="draft">draft</option>
       <option value="submitted">submitted</option>
       <option value="archived">archived</option>
      </select>
     </label>
    </div>

    <div className="mt-5 flex justify-end gap-2">
     <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
      Cancel
     </button>
     <button
      onClick={handleSubmit}
      disabled={saving}
      className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-70"
     >
      {saving ? "Creating..." : "Create EPR"}
     </button>
    </div>
   </div>
  </div>
 )
}
