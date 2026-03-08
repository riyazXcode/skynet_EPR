import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "x-user-id": "079978da-bedb-46c0-93d4-ed0f5d5be558",
        "x-user-role": "instructor"
    }
})

export default apiClient