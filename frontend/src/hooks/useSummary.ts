import { useEffect, useState } from "react"
import { getSummary } from "../api/eprApi"
import { type Summary } from "../types/summary"

export const useSummary = (personId?: string, refreshKey = 0) => {

 const [summary, setSummary] = useState<Summary | null>(null)

 useEffect(() => {

  if (!personId) return

 const load = async () => {
   try {
    const data = await getSummary(personId)
    setSummary(data)
   } catch (error) {
    console.error(error)
    setSummary(null)
   }

  }

  load()

 }, [personId, refreshKey])

 return summary

}
