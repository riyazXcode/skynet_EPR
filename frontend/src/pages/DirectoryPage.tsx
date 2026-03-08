import { useState } from "react"
import { usePeople } from "../hooks/usePeople"
import PeopleList from "../components/people/PeopleList"
import { type Person } from "../types/people"
import { useEprs } from "../hooks/useEprs"
import EprList from "../components/epr/EprList"


export default function DirectoryPage() {

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const { people, loading } = usePeople()
    const { records, loading: eprLoading } = useEprs(selectedPerson?.id)

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

                        <p className="text-gray-600 mb-6">
                            {selectedPerson.role}
                        </p>

                        <h3 className="font-semibold mb-3">
                            Performance Records
                        </h3>

                        {eprLoading && <div>Loading records...</div>}

                        {!eprLoading && (
                            <EprList records={records} />
                        )}

                    </div>

                )}

            </div>

        </div>

    )

}
