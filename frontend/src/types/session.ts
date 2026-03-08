export type SessionRole = "student" | "instructor" | "admin"

export interface DemoSession {
 id: string
 role: SessionRole
 name: string
}
