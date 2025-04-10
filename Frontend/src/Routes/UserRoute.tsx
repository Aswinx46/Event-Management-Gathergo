import { Route, Routes } from "react-router-dom";
import Signup from "../components/Client/Signup/Signup";
import LoginComponent from "@/components/Client/Login/Login";
import Home from "@/components/Client/home/Home";
import ServicesList from "@/components/Client/services/ServiceListing";
import ServiceBooking from "@/components/Client/services/ServiceBooking";
import ClientLayout from "@/components/Client/sideBar/ClientLayout";
import BookingListing from "@/components/Client/bookingListing/BookingListing";
import CategoryListing from "@/components/Client/category/CategoryListing";
import { UserProfile } from "@/components/Client/profile/UserProfile";
const UserRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/services/:categoryId/:title" element={<ServicesList />}></Route>
            <Route path="/services" element={<ServicesList />}></Route>
            <Route path="/serviceBooking/:serviceId/:vendorId" element={<ServiceBooking />}></Route>
            <Route path="/categories" element={<CategoryListing/>}></Route>
            <Route path="/profile/*" element={<ClientLayout />}>
                <Route path="bookings" element={<BookingListing/>} ></Route>
                <Route path="home" element={<UserProfile />} ></Route>
                {/* <Route path="logout" element={<LogoutConfirmation/>} ></Route> */}
            </Route>
        </Routes>
    )
}

export default UserRoute