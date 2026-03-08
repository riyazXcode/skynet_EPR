import { useEffect, useState } from "react"
import { getPeople } from "../api/peopleApi"
import { type Person } from "../types/people"

export const usePeople = (search?: string, role?: "student" | "instructor" | "all") => {

 const [people, setPeople] = useState<Person[]>([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState("")

 useEffect(() => {
  const load = async () => {
   try {
    setLoading(true)
    setError("")

    const data = await getPeople({
     search: search?.trim() ? search.trim() : undefined,
     role: role && role !== "all" ? role : undefined
    })
    setPeople(data)
   } catch (err) {
    console.error(err)
    setError("Failed to fetch people")
   } finally {
    setLoading(false)
   }
  }

  load()

 }, [search, role])

 return { people, loading, error }

}
