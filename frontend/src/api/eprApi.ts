import apiClient from "./apiClient"

interface GetEprsParams {
 personId?: string
 evaluatorId?: string
}

export const getEprs = async ({ personId, evaluatorId }: GetEprsParams) => {

 const query = personId ? `personId=${personId}` : `evaluatorId=${evaluatorId}`
 const res = await apiClient.get(`/api/epr?${query}`)

 return res.data.data

}

export const getEpr = async (id: string) => {

 const res = await apiClient.get(`/api/epr/${id}`)

 return res.data.data

}

export const createEpr = async (data: any) => {
 const res = await apiClient.post("/api/epr", data)
 return res.data
}

export const updateEpr = async (id: string, data: any) => {

 const res = await apiClient.patch(`/api/epr/${id}`, data)

 return res.data.data

}

export const getSummary = async (personId: string) => {

 const res = await apiClient.get(`/api/epr/summary/${personId}`)

 return res.data.data

}

export const generateAiRemark = async (data: any) => {

 const res = await apiClient.post(`/api/epr/assist`, data)

 return res.data.data

}
