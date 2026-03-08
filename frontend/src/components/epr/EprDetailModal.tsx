import { useState } from "react"
import { updateEpr } from "../../api/eprApi"
import { type EprRecord } from "../../types/epr"
import { useToast } from "../common/ToastProvider"

interface Props {
 record: EprRecord
 onClose: () => void
 onUpdated?: () => void
}

const formatDate = (value: string) => {
 const date = new Date(value)
 if (Number.isNaN(date.getTime())) return value

 const dd = String(date.getDate()).padStart(2, "0")
 const mm = String(date.getMonth() + 1).padStart(2, "0")
 const yyyy = date.getFullYear()

 return `${dd}-${mm}-${yyyy}`
}

export default function EprDetailModal({ record, onClose, onUpdated }: Props) {
 const [isEditing, setIsEditing] = useState(false)
 const [saving, setSaving] = useState(false)
 const [form, setForm] = useState<EprRecord>({ ...record })
 const [error, setError] = useState("")
 const { showToast } = useToast()

 const handleSave = async () => {
  setSaving(true)
  setError("")

  try {
   await updateEpr(record.id, {
    overallRating: form.overall_rating,
    technicalSkillsRating: form.technical_skills_rating,
    nonTechnicalSkillsRating: form.non_technical_skills_rating,
    remarks: form.remarks,
    status: form.status,
    periodStart: form.period_start,
    periodEnd: form.period_end
   })

   showToast("EPR updated successfully")
   setIsEditing(false)
   onUpdated?.()
   onClose()
  } catch (err: any) {
   const message = err?.response?.data?.error || "Failed to update EPR"
   setError(message)
   showToast(message, "error")
  } finally {
   setSaving(false)
  }
 }

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 backdrop-blur-sm">
   <div className="w-full max-w-2xl rounded-3xl border border-sky-100 bg-white p-5 shadow-2xl md:p-6">
    <div className="mb-4 flex items-center justify-between">
     <h2 className="text-2xl font-bold">EPR Details</h2>
     <button onClick={onClose} className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-600 hover:bg-slate-50">
      Close
     </button>
    </div>

    {error && <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

    <div className="space-y-4">
     <div className="rounded-xl border border-sky-100 bg-slate-50 p-3 text-sm">
      <strong>Period:</strong> {formatDate(form.period_start)} to {formatDate(form.period_end)}
     </div>

     <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-sky-100 bg-white p-3 text-sm">
       <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">Overall Rating</div>
       {isEditing ? (
        <input
         type="number"
         min={1}
         max={5}
         value={form.overall_rating}
         onChange={(e) => setForm({ ...form, overall_rating: Number(e.target.value) })}
         className="w-full rounded-lg border border-sky-100 px-2 py-1"
        />
       ) : (
        <div className="text-lg font-bold">{form.overall_rating}</div>
       )}
      </div>

      <div className="rounded-xl border border-sky-100 bg-white p-3 text-sm">
       <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">Technical Rating</div>
       {isEditing ? (
        <input
         type="number"
         min={1}
         max={5}
         value={form.technical_skills_rating}
         onChange={(e) => setForm({ ...form, technical_skills_rating: Number(e.target.value) })}
         className="w-full rounded-lg border border-sky-100 px-2 py-1"
        />
       ) : (
        <div className="text-lg font-bold">{form.technical_skills_rating}</div>
       )}
      </div>

      <div className="rounded-xl border border-sky-100 bg-white p-3 text-sm">
       <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">Non-Technical Rating</div>
       {isEditing ? (
        <input
         type="number"
         min={1}
         max={5}
         value={form.non_technical_skills_rating}
         onChange={(e) => setForm({ ...form, non_technical_skills_rating: Number(e.target.value) })}
         className="w-full rounded-lg border border-sky-100 px-2 py-1"
        />
       ) : (
        <div className="text-lg font-bold">{form.non_technical_skills_rating}</div>
       )}
      </div>
     </div>

     <div>
      <div className="mb-1 text-sm font-semibold">Status</div>
      {isEditing ? (
       <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2"
       >
        <option value="draft">draft</option>
        <option value="submitted">submitted</option>
        <option value="archived">archived</option>
       </select>
      ) : (
       <div className="rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm capitalize">{form.status}</div>
      )}
     </div>

     <div>
      <div className="mb-1 text-sm font-semibold">Remarks</div>
      {isEditing ? (
       <textarea
        rows={4}
        value={form.remarks}
        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2"
       />
      ) : (
       <p className="rounded-xl border border-sky-100 bg-slate-50 px-3 py-3 text-sm text-slate-600">{form.remarks || "No remarks"}</p>
      )}
     </div>
    </div>

    <div className="mt-6 flex justify-end gap-2">
     {!isEditing && (
      <button onClick={() => setIsEditing(true)} className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100">
       Edit
      </button>
     )}

     {isEditing && (
      <button
       onClick={handleSave}
       disabled={saving}
       className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70"
      >
       {saving ? "Saving..." : "Save"}
      </button>
     )}
    </div>
   </div>
  </div>
 )
}
