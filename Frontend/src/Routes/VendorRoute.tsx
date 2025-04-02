import { Route, Routes } from "react-router-dom";
import VendorSignup from '../components/Vendor/signup/vendorSignup'
import ImageCarousel from "@/components/other components/ImageCarousal";
import VendorDashboard from "@/components/Vendor/home/VendorHome";
import VendorLogin from "@/components/Vendor/login/VendorLogin";
import VendorLayout from "@/components/Vendor/sidebar/VendorLayout";
const VendorRoute = () => {
    return (
        <Routes>
            <Route path="signup" element={<VendorSignup />}></Route>
            <Route path="login" element={<VendorLogin />}></Route>
            <Route path="/" element={<VendorLayout />}>
                <Route path="carousal" element={<ImageCarousel />}></Route>
                <Route path="home" element={<VendorDashboard />}></Route>
            </Route>
        </Routes>
    )
}

export default VendorRoute