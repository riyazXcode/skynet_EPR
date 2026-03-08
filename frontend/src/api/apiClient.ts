import axios from "axios"
import { getDemoSession } from "../utils/demoSession"

const apiClient = axios.create({
 baseURL: "http://localhost:5000"
})

apiClient.interceptors.request.use((config) => {
 const session = getDemoSession()

 if (session) {
  config.headers = config.headers || {}
  config.headers["x-user-id"] = session.id
  config.headers["x-user-role"] = session.role
 }

 return config
})

export default apiClient
