import { Request, Response } from "express"
import {
    fetchEprsByPerson,
    fetchEprsByEvaluator,
    fetchEprsByPersonForEvaluator,
    hasEprsByPersonForEvaluator,
    fetchEprById,
    fetchUserById,
    insertEpr,
    patchEpr,
    fetchEprSummary,
} from "../services/eprService"
import { validateRating } from "../utils/validation"

const hasInvalidRating = (rating: unknown) => {
    return typeof rating !== "number" || !validateRating(rating)
}
const validRoleTypes = ["student", "instructor"]
const validStatuses = ["draft", "submitted", "archived"]

export const listEprs = async (req: Request, res: Response) => {

    try {

        const { personId, evaluatorId } = req.query
        const currentUserId = req.user?.id
        const currentRole = req.user?.role

        if (!personId && !evaluatorId) {
            return res.status(400).json({
                error: "personId or evaluatorId is required"
            })
        }

        let records = []

        if (currentRole === "admin") {
            records = personId
                ? await fetchEprsByPerson(personId as string)
                : await fetchEprsByEvaluator(evaluatorId as string)
        } else if (currentRole === "instructor") {
            if (evaluatorId && evaluatorId !== currentUserId) {
                return res.status(403).json({
                    success: false,
                    error: "Instructors can only view records they evaluated"
                })
            }

            records = personId
                ? await fetchEprsByPersonForEvaluator(personId as string, currentUserId as string)
                : await fetchEprsByEvaluator(currentUserId as string)
        } else if (currentRole === "student") {
            if (personId !== currentUserId) {
                return res.status(403).json({
                    success: false,
                    error: "Students can only view their own EPRs"
                })
            }

            records = await fetchEprsByPerson(currentUserId as string)
        } else {
            return res.status(403).json({
                success: false,
                error: "Forbidden"
            })
        }

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

        if (req.user?.role === "student" && record.person_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: "Students can only view their own EPRs"
            })
        }

        if (req.user?.role === "instructor" && record.evaluator_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: "Instructors can only view records they evaluated"
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
        if (!data.personId || !data.evaluatorId || !data.periodStart || !data.periodEnd) {
            return res.status(400).json({
                success: false,
                error: "personId, evaluatorId, periodStart and periodEnd are required"
            })
        }

        const [person, evaluator] = await Promise.all([
            fetchUserById(data.personId),
            fetchUserById(data.evaluatorId)
        ])

        if (!person) {
            return res.status(400).json({
                success: false,
                error: "personId does not exist"
            })
        }

        if (!evaluator) {
            return res.status(400).json({
                success: false,
                error: "evaluatorId does not exist"
            })
        }

        if (req.user?.role === "instructor" && data.evaluatorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: "Instructors can only create records as themselves"
            })
        }

        if (!validRoleTypes.includes(data.roleType)) {
            return res.status(400).json({
                success: false,
                error: "Invalid roleType"
            })
        }

        if (!validStatuses.includes(data.status)) {
            return res.status(400).json({
                success: false,
                error: "Invalid status"
            })
        }

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

    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: error?.message || "Failed to create EPR"
        })

    }
}

export const updateEprRecord = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const data = req.body

        const existingRecord = await fetchEprById(id as string)
        if (!existingRecord) {
            return res.status(404).json({
                success: false,
                error: "EPR record not found"
            })
        }

        if (req.user?.role === "student") {
            return res.status(403).json({
                success: false,
                error: "Students cannot update EPR records"
            })
        }

        if (req.user?.role === "instructor" && existingRecord.evaluator_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: "Instructors can only update records they evaluated"
            })
        }

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

        if (req.user?.role === "student" && req.user.id !== personId) {
            return res.status(403).json({
                success: false,
                error: "Students can only view their own summary"
            })
        }

        if (req.user?.role === "instructor") {
            const canView = await hasEprsByPersonForEvaluator(personId as string, req.user.id)
            if (!canView) {
                return res.status(403).json({
                    success: false,
                    error: "Instructors can only view summaries for students they evaluated"
                })
            }
        }

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
