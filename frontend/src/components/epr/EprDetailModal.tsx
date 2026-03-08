import { type EprRecord } from "../../types/epr"

interface Props {
 record: EprRecord
 onClose: () => void
}

export default function EprDetailModal({ record, onClose }: Props) {
    
const formatDateTime = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const yyyy = date.getFullYear()


  return `${dd}-${mm}-${yyyy}`
}

 return (

  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

   <div className="bg-white p-6 rounded w-[500px]">

    <div className="flex justify-between mb-4">

     <h2 className="text-lg font-bold">
      EPR Details
     </h2>

     <button onClick={onClose}>X</button>

    </div>

    <div className="space-y-2">

     <div>
      Period: {formatDateTime(record.period_start)} to {formatDateTime(record.period_end)}
     </div>

     <div>
      Overall Rating: {record.overall_rating}
     </div>

     <div>
      Technical Rating: {record.technical_skills_rating}
     </div>

     <div>
      Non-Technical Rating: {record.non_technical_skills_rating}
     </div>

     <div>
      Status: {record.status}
     </div>

     <div className="mt-3">
      Remarks:
      <p className="text-gray-600">
       {record.remarks}
      </p>
     </div>

    </div>

   </div>

  </div>

 )
}