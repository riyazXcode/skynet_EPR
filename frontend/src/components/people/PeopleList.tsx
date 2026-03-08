import { type Person } from "../../types/people"
import PersonCard from "./PersonCard"

interface Props {
 people: Person[]
 onSelect: (p: Person) => void
}

export default function PeopleList({ people, onSelect }: Props) {

 return (

  <div className="space-y-2">

   {people.map(p => (
    <PersonCard
     key={p.id}
     person={p}
     onSelect={onSelect}
    />
   ))}

  </div>

 )

}