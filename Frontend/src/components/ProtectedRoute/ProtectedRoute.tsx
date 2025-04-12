import { ReactNode } from "react";
import { Navigate } from "react-router-dom"
interface ProtectedRouteProps {
    children: ReactNode;
  }
function ProtectedRouteClient({ children }:ProtectedRouteProps) {
    const id = localStorage.getItem('id')
    return (
        id ? children : <Navigate to='/login' />
    )
}

export default ProtectedRouteClient