// import * as React from 'react'

// import { useAuth } from 'utils/hooks/auth'
// import { useLocation, Navigate } from 'react-router-dom'
import { UserRole } from 'models/Auth'

// import { toast } from 'react-toastify'

export const RequireAuth = ({ role, children }: { role: UserRole; children: JSX.Element }) => {
  console.log(role)
  // const auth = useAuth()
  // const location = useLocation()

  // if (!auth.user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // } else if (auth.user.role !== role) {
  //   toast("Vous n'avez pas le bon role")
  //   return <Navigate to="/login" />
  // }

  return children
}
