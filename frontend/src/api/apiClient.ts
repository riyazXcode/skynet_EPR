import axios from "axios"

const currentUserId = (import.meta.env?.VITE_USER_ID as string) || "079978da-bedb-46c0-93d4-ed0f5d5be558"
const currentUserRole = (import.meta.env?.VITE_USER_ROLE as string) || "instructor"

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "x-user-id": currentUserId,
        "x-user-role": currentUserRole
    }
})

export default apiClient
