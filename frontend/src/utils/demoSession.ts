import { type DemoSession } from "../types/session"

const STORAGE_KEY = "skynet_demo_session"

export const getDemoSession = (): DemoSession | null => {
 if (typeof window === "undefined") return null

 const raw = window.localStorage.getItem(STORAGE_KEY)
 if (!raw) return null

 try {
  const parsed = JSON.parse(raw) as DemoSession
  if (!parsed?.id || !parsed?.role || !parsed?.name) return null
  return parsed
 } catch {
  return null
 }
}

export const setDemoSession = (session: DemoSession) => {
 if (typeof window === "undefined") return
 window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export const clearDemoSession = () => {
 if (typeof window === "undefined") return
 window.localStorage.removeItem(STORAGE_KEY)
}
