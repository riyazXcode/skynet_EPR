import { type EprRecord } from "../../types/epr"
import EprCard from "./EprCard"

interface Props {
 records: EprRecord[]
 selectedRole?: "student" | "instructor" | "admin"
 onSelect: (r: EprRecord) => void
}

export default function EprList({ records, selectedRole, onSelect }: Props) {
 if (!records.length) {
  return (
   <div className="rounded-2xl border border-dashed border-sky-200 bg-white p-6 text-sm text-slate-500">
    No performance records found for this person.
   </div>
  )
 }

 return (
  <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
   {records.map((record) => (
    <EprCard key={record.id} record={record} selectedRole={selectedRole} onSelect={onSelect} />
   ))}
  </div>
 )
}
