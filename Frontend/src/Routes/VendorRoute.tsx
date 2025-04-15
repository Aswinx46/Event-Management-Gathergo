import { Route, Routes } from "react-router-dom";
import VendorSignup from '../components/Vendor/signup/vendorSignup'
import ImageCarousel from "@/components/other components/ImageCarousal";
import VendorDashboard from "@/components/Vendor/home/VendorHome";
import VendorLogin from "@/components/Vendor/login/VendorLogin";
import VendorLayout from "@/components/Vendor/sidebar/VendorLayout";
import ServiceListingVendor from "@/components/Vendor/serviceManagement/ServiceListingVendor";
import ShowBookingsVendor from "@/components/Vendor/bookings/ShowBookingsVendor";
import ProtectedRouteVendor from "@/components/Vendor/ProtectedRouteVendor/ProtectedRouteVendor";
import BlockedScreen from "@/components/other components/UserBlockNotice";
import NotFound from "@/components/other components/NotFound";
import WorkSamples from "@/components/Vendor/workSamples/ShowWorkSamples";
import AddWorkSample from "@/components/Vendor/workSamples/AddWorkSamples";
const VendorRoute = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="signup" element={<VendorSignup />}></Route>
            <Route path="login" element={<VendorLogin />}></Route>
            <Route path="/userBlockNotice" element={<BlockedScreen />}></Route>
            <Route path="/" element={<VendorLayout />}>
                <Route path="carousal" element={<ProtectedRouteVendor><ImageCarousel /></ProtectedRouteVendor>}></Route>
                <Route path="home" element={<ProtectedRouteVendor><VendorDashboard /></ProtectedRouteVendor>}></Route>
                <Route path="services" element={<ProtectedRouteVendor><ServiceListingVendor /></ProtectedRouteVendor>}></Route>
                <Route path="bookings" element={<ProtectedRouteVendor><ShowBookingsVendor /></ProtectedRouteVendor>}></Route>
                <Route path="workSamples" element={<ProtectedRouteVendor><WorkSamples /></ProtectedRouteVendor>}></Route>
                <Route path="addWorkSamples" element={<ProtectedRouteVendor><AddWorkSample /></ProtectedRouteVendor>}></Route>
            </Route>
        </Routes>
    )
}

export default VendorRoute