import { type EprRecord } from "../../types/epr"

interface Props {
  record: EprRecord
  onSelect: (r: EprRecord) => void
}

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

export default function EprCard({ record, onSelect }: Props) {

  return (
    <div>

      <div className="border rounded p-3 shadow-sm cursor-pointer hover:bg-gray-100" onClick={() => onSelect(record)}>

        <div className="flex justify-between">

          <div className="font-semibold">
            {formatDateTime(record.period_start)} to {formatDateTime(record.period_end)}
          </div>

          <div className="text-sm text-gray-500">
            {record.status}
          </div>

        </div>

        <div className="mt-2 text-sm">

          Overall Rating:
          <span className="font-semibold ml-1">
            {record.overall_rating}
          </span>

        </div>

      </div>
    </div>
  )

}

