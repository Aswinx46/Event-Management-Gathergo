import { Route,Routes } from "react-router-dom";
import VendorSignup from '../components/Vendor/signup/vendorSignup'
import ImageCarousel from "@/components/other components/ImageCarousal";
import VendorDashboard from "@/components/Vendor/home/VendorHome";
const VendorRoute=()=>{
    return (
        <Routes>
            <Route path="signup" element={<VendorSignup/>}></Route>
            <Route path="carousal" element={<ImageCarousel/>}></Route>
            <Route path="home" element={<VendorDashboard/>}></Route>
        </Routes>
    )
}

export default VendorRoute