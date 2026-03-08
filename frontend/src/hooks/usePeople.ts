import { useEffect, useState } from "react"
import { getPeople } from "../api/peopleApi"
import { type Person } from "../types/people"

export const usePeople = () => {

 const [people, setPeople] = useState<Person[]>([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {

  const load = async () => {
   try {
    const data = await getPeople()
    setPeople(data)
   } catch (err) {
    console.error(err)
   } finally {
    setLoading(false)
   }
  }

  load()

 }, [])

 return { people, loading }

}