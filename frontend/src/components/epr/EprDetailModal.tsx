import { type EprRecord } from "../../types/epr"
import { useState } from "react"
import { updateEpr } from "../../api/eprApi"

interface Props {
    record: EprRecord
    onClose: () => void
}

export default function EprDetailModal({ record, onClose }: Props) {

    const [isEditing, setIsEditing] = useState(false)

    const [form, setForm] = useState<EprRecord>({ ...record })

    const formatDateTime = (value: string) => {
        const date = new Date(value)

        if (Number.isNaN(date.getTime())) return value

        const dd = String(date.getDate()).padStart(2, "0")
        const mm = String(date.getMonth() + 1).padStart(2, "0")
        const yyyy = date.getFullYear()

        return `${dd}-${mm}-${yyyy}`
    }

    const handleSave = async () => {

        await updateEpr(record.id, {
            overallRating: form.overall_rating,
            technicalSkillsRating: form.technical_skills_rating,
            nonTechnicalSkillsRating: form.non_technical_skills_rating,
            remarks: form.remarks,
            status: form.status,
            periodStart: form.period_start,
            periodEnd: form.period_end
        })

        setIsEditing(false)

        window.location.reload()
    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded w-[520px]">

                <div className="flex justify-between mb-4">

                    <h2 className="text-lg font-bold">
                        EPR Details
                    </h2>

                    <button onClick={onClose}>X</button>

                </div>

                <div className="space-y-3">

                    <div>
                        <strong>Period:</strong>{" "}
                        {formatDateTime(form.period_start)} to {formatDateTime(form.period_end)}
                    </div>

                    <div>
                        <strong>Overall Rating:</strong>

                        {isEditing ? (
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={form.overall_rating}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        overall_rating: Number(e.target.value)
                                    })
                                }
                                className="border ml-2 p-1 w-16"
                            />
                        ) : (
                            <span className="ml-2">{form.overall_rating}</span>
                        )}
                    </div>

                    <div>
                        <strong>Technical Rating:</strong>

                        {isEditing ? (
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={form.technical_skills_rating}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        technical_skills_rating: Number(e.target.value)
                                    })
                                }
                                className="border ml-2 p-1 w-16"
                            />
                        ) : (
                            <span className="ml-2">{form.technical_skills_rating}</span>
                        )}
                    </div>

                    <div>
                        <strong>Non-Technical Rating:</strong>

                        {isEditing ? (
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={form.non_technical_skills_rating}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        non_technical_skills_rating: Number(e.target.value)
                                    })
                                }
                                className="border ml-2 p-1 w-16"
                            />
                        ) : (
                            <span className="ml-2">{form.non_technical_skills_rating}</span>
                        )}
                    </div>

                    <div>
                        <strong>Status:</strong>

                        {isEditing ? (
                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        status: e.target.value
                                    })
                                }
                                className="border ml-2 p-1"
                            >
                                <option value="draft">draft</option>
                                <option value="submitted">submitted</option>
                                <option value="archived">archived</option>
                            </select>
                        ) : (
                            <span className="ml-2">{form.status}</span>
                        )}
                    </div>

                    <div>
                        <strong>Remarks:</strong>

                        {isEditing ? (
                            <textarea
                                value={form.remarks}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        remarks: e.target.value
                                    })
                                }
                                className="border w-full p-2 mt-1"
                            />
                        ) : (
                            <p className="text-gray-600 mt-1">{form.remarks}</p>
                        )}
                    </div>

                </div>

                <div className="flex justify-end gap-2 mt-5">

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            Edit
                        </button>
                    )}

                    {isEditing && (
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                            Save
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="px-3 py-1 border rounded"
                    >
                        Close
                    </button>

                </div>

            </div>
            

        </div>

    )
}

