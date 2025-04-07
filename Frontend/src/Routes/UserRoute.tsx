import { Route, Routes } from "react-router-dom";
import Signup from "../components/Client/Signup/Signup";
import LoginComponent from "@/components/Client/Login/Login";
import Home from "@/components/Client/home/Home";
import ServicesList from "@/components/Client/services/ServiceListing";
import ServiceBooking from "@/components/Client/services/ServiceBooking";
const UserRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/services" element={<ServicesList />}></Route>
            <Route path="/serviceBooking/:serviceId/:vendorId" element={<ServiceBooking />}></Route>
        </Routes>
    )
}

export default UserRoute