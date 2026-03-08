import { useState } from "react"
import { createEpr } from "../../api/eprApi"

interface Props {
    personId: string
    evaluatorId: string
    onClose: () => void
}

export default function EprForm({ personId, evaluatorId, onClose }: Props) {

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
                roleType: "student",
                ...form
            })

            window.location.reload()
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to create EPR")
        } finally {
            setSaving(false)
        }
    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded w-[520px]">

                <h2 className="text-lg font-bold mb-4">
                    Create New EPR
                </h2>

                <div className="space-y-3">
                    {error && (
                        <div className="text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        Period Start
                        <input
                            type="date"
                            className="border w-full p-2"
                            value={form.periodStart}
                            onChange={(e) =>
                                setForm({ ...form, periodStart: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        Period End
                        <input
                            type="date"
                            className="border w-full p-2"
                            value={form.periodEnd}
                            onChange={(e) =>
                                setForm({ ...form, periodEnd: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        Overall Rating
                        <input
                            type="number"
                            min={1}
                            max={5}
                            className="border w-full p-2"
                            value={form.overallRating}
                            onChange={(e) =>
                                setForm({ ...form, overallRating: Number(e.target.value) })
                            }
                        />
                    </div>

                    <div>
                        Technical Rating
                        <input
                            type="number"
                            min={1}
                            max={5}
                            className="border w-full p-2"
                            value={form.technicalSkillsRating}
                            onChange={(e) =>
                                setForm({ ...form, technicalSkillsRating: Number(e.target.value) })
                            }
                        />
                    </div>

                    <div>
                        Non-Technical Rating
                        <input
                            type="number"
                            min={1}
                            max={5}
                            className="border w-full p-2"
                            value={form.nonTechnicalSkillsRating}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    nonTechnicalSkillsRating: Number(e.target.value)
                                })
                            }
                        />
                    </div>

                    <div>
                        Remarks
                        <textarea
                            className="border w-full p-2"
                            value={form.remarks}
                            onChange={(e) =>
                                setForm({ ...form, remarks: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        Status
                        <select
                            className="border w-full p-2"
                            value={form.status}
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.value })
                            }
                        >
                            <option value="draft">draft</option>
                            <option value="submitted">submitted</option>
                            <option value="archived">archived</option>
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-2 mt-5">

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                        {saving ? "Creating..." : "Create"}
                    </button>

                    <button
                        onClick={onClose}
                        className="px-3 py-1 border rounded"
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    )
}

