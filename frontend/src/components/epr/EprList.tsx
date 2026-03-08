import { type EprRecord } from "../../types/epr"
import EprCard from "./EprCard"

interface Props {
 records: EprRecord[]
 onSelect: (r: EprRecord) => void
}

export default function EprList({ records, onSelect }: Props) {

 if (!records.length) {
  return <div>No records found</div>
 }

 return (

  <div className="space-y-3">

   {records.map(r => (
    <EprCard
     key={r.id}
     record={r}
     onSelect={onSelect}
    />
   ))}

  </div>

 )
}