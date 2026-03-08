import { Request, Response } from "express"
import { fetchPeople } from "../services/peopleService"

export const getPeople = async (req: Request, res: Response) => {
 try {

  const { role, search } = req.query

  const people = await fetchPeople(
   role as string | undefined,
   search as string | undefined
  )

  res.json({
   success: true,
   data: people
  })

 } catch (error) {

  console.error(error)

  res.status(500).json({
   success: false,
   error: "Failed to fetch people"
  })

 }
}