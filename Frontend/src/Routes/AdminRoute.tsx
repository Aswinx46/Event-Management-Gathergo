import AdminDashboard from "@/components/Admin/dashboard/AdminDashboard"
import Adminlogin from "@/components/Admin/login/Adminlogin"
import { Route, Routes } from "react-router-dom"
import AdminLayout from "@/components/Admin/sidebar/AdminLayout"
import UserManagement from "@/components/Admin/userManagement/UserManagement"
import EventProviders from "@/components/Admin/vendorManagement/VendorManagement"
import PendingVendors from "@/components/Admin/vendorManagement/ShowPendingVendor"
import RejectedVendors from "@/components/Admin/vendorManagement/RejectedVendors"
import CategoryManagement from "@/components/Admin/categoryManagement/CategoryManagement"
import AdminProtectedRoute from "@/components/Admin/ProtectedRoute/ProtectedRoute"
const AdminRoute = () => {
    return (
        <Routes>
            <Route path="login" element={<Adminlogin />}></Route>
            <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}></Route>
                <Route path="userManagement" element={<AdminProtectedRoute><UserManagement /></AdminProtectedRoute>}></Route>
                <Route path="eventProviders" element={<AdminProtectedRoute><EventProviders /></AdminProtectedRoute>}></Route>
                <Route path="pendingVendors" element={<AdminProtectedRoute><PendingVendors /></AdminProtectedRoute>}></Route>
                <Route path="rejectedVendors" element={<AdminProtectedRoute><RejectedVendors /></AdminProtectedRoute>}></Route>
                <Route path="categoryManagement" element={<AdminProtectedRoute><CategoryManagement /></AdminProtectedRoute>}></Route>
            </Route>
        </Routes>
    )
}
export default AdminRoute