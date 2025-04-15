import { ReactNode } from "react";
import { Navigate } from "react-router-dom"
interface ProtectedRouteProps {
    children: ReactNode;
  }
function ProtectedRouteVendor({ children }:ProtectedRouteProps) {
    const id = localStorage.getItem('vendorId')
    return (
        id ? children : <Navigate to='/vendor/login' />
    )
}

export default ProtectedRouteVendor