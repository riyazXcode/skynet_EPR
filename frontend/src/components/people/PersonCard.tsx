import { type Person } from "../../types/people"

interface Props {
 person: Person
 onSelect: (p: Person) => void
}

export default function PersonCard({ person, onSelect }: Props) {

 return (

  <div
   onClick={() => onSelect(person)}
   className="p-3 border rounded cursor-pointer hover:bg-gray-100"
  >

   <div className="font-semibold">
    {person.name}
   </div>

   <div className="text-sm text-gray-600">
    {person.email}
   </div>

   <div className="text-xs mt-1">

    {person.role === "student" && (
     <span>
      {person.course_name} - {person.enrollment_status}
     </span>
    )}

    {person.role === "instructor" && (
     <span>
      EPRs written: {person.total_eprs_written}
     </span>
    )}

   </div>

  </div>

 )

}

