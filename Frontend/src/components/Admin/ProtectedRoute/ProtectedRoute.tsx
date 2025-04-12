import React from "react"
import { Navigate } from "react-router-dom"

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const id = localStorage.getItem('id')
    return (
        id ? children : <Navigate to='/admin/login' />
    )
}
export default AdminProtectedRoute