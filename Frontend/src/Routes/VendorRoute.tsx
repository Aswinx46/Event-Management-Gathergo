import { Route,Routes } from "react-router-dom";
import VendorSignup from '../components/Vendor/signup/vendorSignup'
import ImageCarousel from "@/components/other components/ImageCarousal";
import VendorDashboard from "@/components/Vendor/home/VendorHome";
import VendorLogin from "@/components/Vendor/login/VendorLogin";
const VendorRoute=()=>{
    return (
        <Routes>
            <Route path="signup" element={<VendorSignup/>}></Route>
            <Route path="carousal" element={<ImageCarousel/>}></Route>
            <Route path="home" element={<VendorDashboard/>}></Route>
            <Route path="login" element={<VendorLogin/>}></Route>
        </Routes>
    )
}

export default VendorRoute