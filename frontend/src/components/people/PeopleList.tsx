import { type Person } from "../../types/people"
import PersonCard from "./PersonCard"

interface Props {
 people: Person[]
 selectedId?: string
 onSelect: (p: Person) => void
}

export default function PeopleList({ people, selectedId, onSelect }: Props) {
 if (!people.length) {
  return <div className="rounded-xl border border-sky-100 bg-white p-4 text-sm text-slate-500">No people found.</div>
 }

 return (
  <div className="space-y-2">
   {people.map((person) => (
    <PersonCard
     key={person.id}
     person={person}
     isSelected={selectedId === person.id}
     onSelect={onSelect}
    />
   ))}
  </div>
 )
}
