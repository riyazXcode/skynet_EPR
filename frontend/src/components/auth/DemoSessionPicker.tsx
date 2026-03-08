import { useEffect, useMemo, useState } from "react"
import { getPeople } from "../../api/peopleApi"
import { type Person } from "../../types/people"
import { type DemoSession, type SessionRole } from "../../types/session"

interface Props {
 onSelect: (session: DemoSession) => void
 onClose?: () => void
}

const roleLabel: Record<SessionRole, string> = {
 instructor: "Demo Instructor",
 student: "Demo User",
 admin: "Demo Admin"
}

export default function DemoSessionPicker({ onSelect, onClose }: Props) {
 const [people, setPeople] = useState<Person[]>([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  const load = async () => {
   try {
    const data = await getPeople()
    setPeople(data)
   } finally {
    setLoading(false)
   }
  }

  load()
 }, [])

 const options = useMemo(() => {
  const firstInstructor = people.find((p) => p.role === "instructor")
  const firstStudent = people.find((p) => p.role === "student")
  const firstAdmin = people.find((p) => p.role === "admin")

  return {
   instructor: firstInstructor,
   student: firstStudent,
   admin: firstAdmin || firstInstructor || firstStudent
  } as Record<SessionRole, Person | undefined>
 }, [people])

 const signIn = (role: SessionRole) => {
  const person = options[role]
  if (!person) return

  onSelect({
   id: person.id,
   role,
   name: role === "admin" ? "Demo Admin" : person.name
  })
 }

 return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
   <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl">
    <h2 className="text-xl font-bold">Demo Sign In</h2>
    <p className="mt-1 text-sm text-slate-500">Choose a demo role to continue.</p>

    <div className="mt-4 space-y-2">
     {(Object.keys(roleLabel) as SessionRole[]).map((role) => (
      <button
       key={role}
       type="button"
       disabled={loading || !options[role]}
       onClick={() => signIn(role)}
       className="flex w-full items-center justify-between rounded-xl border border-sky-100 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
       <span>{roleLabel[role]}</span>
       <span className="text-xs capitalize text-slate-400">{role}</span>
      </button>
     ))}
    </div>

    {onClose && (
      <div className="mt-4 flex justify-end">
       <button
        type="button"
        onClick={onClose}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
       >
        Close
       </button>
      </div>
    )}
   </div>
  </div>
 )
}
