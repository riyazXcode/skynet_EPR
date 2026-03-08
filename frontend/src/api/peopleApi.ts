import apiClient from "./apiClient"

export const getPeople = async () => {

 const response = await apiClient.get("/api/people")

 return response.data.data

}