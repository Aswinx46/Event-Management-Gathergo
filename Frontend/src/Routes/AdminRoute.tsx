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
import NotFound from "@/components/other components/NotFound"
import AdminWallet from "@/components/Admin/wallet/AdminWallett"
import BookingsListAdmin from "@/components/Admin/bookingListing/BookingListingAdmin"
import { EventsListingAdmin } from "@/components/Admin/eventListing/EventListingInAdmin"
const AdminRoute = () => {
    return (
        <Routes>
            <Route path="login" element={<Adminlogin />}></Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}></Route>
                <Route path="userManagement" element={<AdminProtectedRoute><UserManagement /></AdminProtectedRoute>}></Route>
                <Route path="eventProviders" element={<AdminProtectedRoute><EventProviders /></AdminProtectedRoute>}></Route>
                <Route path="pendingVendors" element={<AdminProtectedRoute><PendingVendors /></AdminProtectedRoute>}></Route>
                <Route path="rejectedVendors" element={<AdminProtectedRoute><RejectedVendors /></AdminProtectedRoute>}></Route>
                <Route path="categoryManagement" element={<AdminProtectedRoute><CategoryManagement /></AdminProtectedRoute>}></Route>
                <Route path="wallet" element={<AdminProtectedRoute><AdminWallet /></AdminProtectedRoute>}></Route>
                <Route path="bookings" element={<AdminProtectedRoute><BookingsListAdmin /></AdminProtectedRoute>}></Route>
                <Route path="events" element={<AdminProtectedRoute><EventsListingAdmin /></AdminProtectedRoute>}></Route>
            </Route>
        </Routes>
    )
}
export default AdminRoute