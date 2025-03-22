import AdminDashboard from "@/components/Admin/dashboard/AdminDashboard"
import Adminlogin from "@/components/Admin/login/Adminlogin"
import { Route, Routes } from "react-router-dom"
import AdminLayout from "@/components/Admin/sidebar/AdminLayout"
import UserManagement from "@/components/Admin/userManagement/UserManagement"
import EventProviders from "@/components/Admin/vendorManagement/VendorManagement"
import PendingVendors from "@/components/Admin/vendorManagement/ShowPendingVendor"
const AdminRoute = () => {
    return (
        <Routes>
            <Route path="login" element={<Adminlogin />}></Route>
            <Route path="/" element={<AdminLayout/>}>
                <Route path="dashboard" element={<AdminDashboard />}></Route>
                <Route path="userManagement" element={<UserManagement />}></Route>
                <Route path="eventProviders" element={<EventProviders />}></Route>
                <Route path="pendingVendors" element={<PendingVendors />}></Route>
            </Route>
        </Routes>
    )
}
export default AdminRoute