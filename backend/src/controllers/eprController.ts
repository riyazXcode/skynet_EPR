import { Request, Response } from "express"
import {
    fetchEprsByPerson,
    fetchEprById,
    insertEpr,
    patchEpr,
    fetchEprSummary,
} from "../services/eprService"
import { validateRating } from "../utils/validation"

const hasInvalidRating = (rating: unknown) => {
    return typeof rating !== "number" || !validateRating(rating)
}

export const listEprs = async (req: Request, res: Response) => {

    try {

        const { personId } = req.query
        if (req.user?.role === "student" && req.user.id !== personId) {
            return res.status(403).json({ error: "Students can only view their own EPRs" })
        }
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
        if (!record) {
            return res.status(404).json({
                success: false,
                error: "EPR record not found"
            })
        }

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
        const ratings = [
            data.overallRating,
            data.technicalSkillsRating,
            data.nonTechnicalSkillsRating
        ]
        if (ratings.some(hasInvalidRating)) {
            return res.status(400).json({
                success: false,
                error: "Ratings must be between 1 and 5"
            })
        }

        if (data.periodEnd < data.periodStart) {
            return res.status(400).json({
                success: false,
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
        const data = req.body

        const ratings = [
            data.overallRating,
            data.technicalSkillsRating,
            data.nonTechnicalSkillsRating
        ]
        if (ratings.some(hasInvalidRating)) {
            return res.status(400).json({
                success: false,
                error: "Ratings must be between 1 and 5"
            })
        }

        if (data.periodEnd < data.periodStart) {
            return res.status(400).json({
                success: false,
                error: "Invalid period range"
            })
        }

        const updated = await patchEpr(id as string, data)
        if (!updated) {
            return res.status(404).json({
                success: false,
                error: "EPR record not found"
            })
        }

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


export const generateEprRemarks = async (req: Request, res: Response) => {

    try {

        const {
            overallRating,
            technicalSkillsRating,
            nonTechnicalSkillsRating
        } = req.body

        if (
            overallRating == null ||
            technicalSkillsRating == null ||
            nonTechnicalSkillsRating == null
        ) {
            return res.status(400).json({
                success: false,
                error: "Missing rating fields"
            })
        }

        const ratings = [overallRating, technicalSkillsRating, nonTechnicalSkillsRating]
        if (ratings.some(hasInvalidRating)) {
            return res.status(400).json({
                success: false,
                error: "Ratings must be between 1 and 5"
            })
        }

        const avg =
            (overallRating + technicalSkillsRating + nonTechnicalSkillsRating) / 3

        let remark = ""

        if (avg >= 4.5) {
            remark =
                "The student demonstrates excellent technical proficiency, strong situational awareness, and disciplined cockpit procedures."
        }

        else if (avg >= 3.5) {
            remark =
                "The student shows solid technical fundamentals and consistent progress but should continue refining communication and checklist discipline."
        }

        else if (avg >= 2.5) {
            remark =
                "The student demonstrates developing skills but requires additional practice to improve technical accuracy and cockpit coordination."
        }

        else {
            remark =
                "The student requires focused improvement in both technical proficiency and non-technical skills such as communication and situational awareness."
        }

        res.json({
            success: true,
            data: {
                suggestedRemarks: remark
            }
        })

    } catch {
        res.status(500).json({
            success: false,
            error: "Failed to generate AI remarks"
        })

    }

}
