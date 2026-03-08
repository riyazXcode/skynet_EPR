import { Request, Response } from "express"
import {
 fetchEprsByPerson,
 fetchEprById,
 insertEpr,
 patchEpr,
 fetchEprSummary
} from "../services/eprService"

export const listEprs = async (req: Request, res: Response) => {

 try {

  const { personId } = req.query

  if (!personId) {
   return res.status(400).json({
    error: "personId is required"
   })
  }

  const records = await fetchEprsByPerson(personId as string)

  res.json({
   success: true,
   data: records
  })

 } catch (err) {

  res.status(500).json({
   success: false,
   error: "Failed to fetch EPRs"
  })

 }
}

export const getEpr = async (req: Request, res: Response) => {

 try {

  const { id } = req.params

  const record = await fetchEprById(id as string)

  res.json({
   success: true,
   data: record
  })

 } catch {

  res.status(500).json({
   success: false,
   error: "Failed to fetch EPR"
  })

 }
}

export const createEprRecord = async (req: Request, res: Response) => {

 try {

  const data = req.body

  if (data.overallRating < 1 || data.overallRating > 5) {
   return res.status(400).json({
    error: "Rating must be between 1 and 5"
   })
  }

  if (data.periodEnd < data.periodStart) {
   return res.status(400).json({
    error: "Invalid period range"
   })
  }

  const newRecord = await insertEpr(data)

  res.json({
   success: true,
   data: newRecord
  })

 } catch {

  res.status(500).json({
   success: false,
   error: "Failed to create EPR"
  })

 }
}

export const updateEprRecord = async (req: Request, res: Response) => {

 try {

  const { id } = req.params

  const updated = await patchEpr(id as string, req.body)

  res.json({
   success: true,
   data: updated
  })

 } catch {

  res.status(500).json({
   success: false,
   error: "Failed to update EPR"
  })

 }
}


export const getEprSummary = async (req: Request, res: Response) => {

 try {

  const { personId } = req.params

  const summary = await fetchEprSummary(personId as string)

  res.json({
   success: true,
   data: summary
  })

 } catch (error) {

  res.status(500).json({
   success: false,
   error: "Failed to generate summary"
  })

 }

}