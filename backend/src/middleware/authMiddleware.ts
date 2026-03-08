import { Request, Response, NextFunction } from "express"

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {

 const userId = req.headers["x-user-id"] as string
 const userRole = req.headers["x-user-role"] as string

 if (!userId || !userRole) {
  return res.status(401).json({
   success: false,
   error: "Missing authentication headers"
  })
 }

 req.user = {
  id: userId,
  role: userRole
 }

 next()
}

export const requireRole = (roles: string[]) => {

 return (req: Request, res: Response, next: NextFunction) => {

  const userRole = req.user?.role

  if (!roles.includes(userRole || "")) {

   return res.status(403).json({
    success: false,
    error: "Forbidden"
   })

  }

  next()

 }

}