export interface Person {
 id: string
 name: string
 email: string
 role: "student" | "instructor" | "admin"
 course_name?: string
 enrollment_status?: string
 total_eprs_written?: number
}