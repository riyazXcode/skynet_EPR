import { useEffect, useState } from "react"
import { getEprs } from "../api/eprApi.ts"
import { type EprRecord } from "../types/epr"
import { type Person } from "../types/people"

export const useEprs = (personId?: string, role?: Person["role"], refreshKey = 0) => {

 const [records, setRecords] = useState<EprRecord[]>([])
 const [loading, setLoading] = useState(false)

 useEffect(() => {

  if (!personId || !role) {
   setRecords([])
   return
  }

  const load = async () => {

   setLoading(true)

   try {

    const data = role === "instructor"
     ? await getEprs({ evaluatorId: personId })
     : await getEprs({ personId })
    setRecords(data)

   } catch (err) {

    console.error(err)

   } finally {

    setLoading(false)

   }

  }

  load()

 }, [personId, role, refreshKey])

 return { records, loading }

}
