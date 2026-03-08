import { useState } from "react"
import { usePeople } from "../hooks/usePeople"
import PeopleList from "../components/people/PeopleList"
import { type Person } from "../types/people"
import { useEprs } from "../hooks/useEprs"
import EprList from "../components/epr/EprList"
import EprDetailModal from "../components/epr/EprDetailModal"
import { type EprRecord } from "../types/epr"
import EprForm from "../components/epr/EprForm"


export default function DirectoryPage() {

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const { people, loading } = usePeople()
    const { records, loading: eprLoading } = useEprs(selectedPerson?.id)
    const [selectedEpr, setSelectedEpr] = useState<EprRecord | null>(null)
    const [showCreate, setShowCreate] = useState(false)
    const defaultEvaluatorId = people.find((p) => p.role === "instructor")?.id || ""

    if (loading) {
        return <div>Loading people...</div>
    }

    return (

        <div className="grid grid-cols-3 h-screen">

            <div className="border-r p-4 overflow-y-auto">

                <h2 className="text-lg font-bold mb-4">
                    People Directory
                </h2>

                <PeopleList
                    people={people}
                    onSelect={setSelectedPerson}
                />


            </div>

            <div className="col-span-2 p-6">
                {selectedPerson && (

                    <div>

                        <h2 className="text-xl font-bold">
                            {selectedPerson.name}
                        </h2>

                        <p className="text-gray-600 mb-3">
                            {selectedPerson.role}
                        </p>
                        <button
                            onClick={() => setShowCreate(true)}
                            className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            New EPR
                        </button>

                        <h3 className="font-semibold mb-3">
                            Performance Records
                        </h3>

                        {selectedEpr && (
                            <EprDetailModal
                                record={selectedEpr}
                                onClose={() => setSelectedEpr(null)}
                            />
                        )}

                        {!eprLoading && (
                            <EprList
                                records={records}
                                onSelect={setSelectedEpr}
                            />
                        )}

                        {showCreate && selectedPerson && (

                            <EprForm
                                personId={selectedPerson.id}
                                evaluatorId={defaultEvaluatorId}
                                onClose={() => setShowCreate(false)}
                            />

                        )}

                    </div>

                )}

            </div>

        </div>

    )

}
