import { useEffect, useState } from "react"
import { getEprs } from "../api/eprApi.ts"
import { type EprRecord } from "../types/epr"

export const useEprs = (personId?: string) => {

 const [records, setRecords] = useState<EprRecord[]>([])
 const [loading, setLoading] = useState(false)

 useEffect(() => {

  if (!personId) return

  const load = async () => {

   setLoading(true)

   try {

    const data = await getEprs(personId)
    setRecords(data)

   } catch (err) {

    console.error(err)

   } finally {

    setLoading(false)

   }

  }

  load()

 }, [personId])

 return { records, loading }

}