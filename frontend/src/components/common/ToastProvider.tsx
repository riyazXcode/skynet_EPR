import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

type ToastType = "success" | "error"

interface ToastItem {
 id: number
 message: string
 type: ToastType
}

interface ToastContextValue {
 showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
 const [toasts, setToasts] = useState<ToastItem[]>([])

 const showToast = useCallback((message: string, type: ToastType = "success") => {
  const id = Date.now() + Math.floor(Math.random() * 1000)
  setToasts((prev) => [...prev, { id, message, type }])
  window.setTimeout(() => {
   setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, 2800)
 }, [])

 const value = useMemo(() => ({ showToast }), [showToast])

 return (
  <ToastContext.Provider value={value}>
   {children}
   <div className="pointer-events-none fixed right-4 top-4 z-[90] flex max-w-sm flex-col gap-2">
    {toasts.map((toast) => (
     <div
      key={toast.id}
      className={`rounded-xl border px-4 py-2 text-sm shadow-lg ${
       toast.type === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
     >
      {toast.message}
     </div>
    ))}
   </div>
  </ToastContext.Provider>
 )
}

export const useToast = () => {
 const context = useContext(ToastContext)
 if (!context) {
  throw new Error("useToast must be used within ToastProvider")
 }

 return context
}
