import { useEffect, useState } from "react"
import DemoSessionPicker from "./components/auth/DemoSessionPicker"
import DirectoryPage from "./pages/DirectoryPage"
import { type DemoSession } from "./types/session"
import { getDemoSession, setDemoSession } from "./utils/demoSession"

function App() {
 const [session, setSession] = useState<DemoSession | null>(() => getDemoSession())
 const [showPicker, setShowPicker] = useState(!session)

 const handleSelectSession = (next: DemoSession) => {
  setDemoSession(next)
  setSession(next)
  setShowPicker(false)
  window.history.pushState({ demoSignedIn: true }, "")
 }

 useEffect(() => {
  const onPopState = () => {
   if (session) {
    setShowPicker(true)
   }
  }

  window.addEventListener("popstate", onPopState)
  return () => window.removeEventListener("popstate", onPopState)
 }, [session])

 return (
  <>
   {session && (
    <DirectoryPage
     currentSession={session}
     onSwitchUser={() => setShowPicker(true)}
    />
   )}

   {showPicker && (
    <DemoSessionPicker
     onSelect={handleSelectSession}
     onClose={session ? () => setShowPicker(false) : undefined}
    />
   )}
  </>
 )

}

export default App
