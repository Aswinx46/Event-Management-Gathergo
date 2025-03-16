import { Route,Routes } from "react-router-dom";
import VendorSignup from '../components/Vendor/signup/vendorSignup'
import ImageCarousel from "@/components/other components/ImageCarousal";
const VendorRoute=()=>{
    return (
        <Routes>
            <Route path="signup" element={<VendorSignup/>}></Route>
            <Route path="carousal" element={<ImageCarousel/>}></Route>
        </Routes>
    )
}

export default VendorRoute