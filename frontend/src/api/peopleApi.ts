import apiClient from "./apiClient"

interface GetPeopleParams {
 role?: "student" | "instructor"
 search?: string
}

export const getPeople = async (params?: GetPeopleParams) => {

 const response = await apiClient.get("/api/people", { params })

 return response.data.data

}
