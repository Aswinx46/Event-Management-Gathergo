import { Route, Routes } from "react-router-dom";
import Signup from "../components/Client/Signup/Signup";
import LoginComponent from "@/components/Client/Login/Login";
import Home from "@/components/Client/home/Home";
import ServicesList from "@/components/Client/services/ServiceListing";
import ServiceBooking from "@/components/Client/services/ServiceBooking";
import ClientLayout from "@/components/Client/sideBar/ClientLayout";
import BookingListing from "@/components/Client/bookingListing/BookingListing";
import CategoryListing from "@/components/Client/category/CategoryListing";
import UserProfile from "@/components/Client/profile/UserProfile";
import PasswordChange from "@/components/Client/profile/ChangePassword";
import ClientHeaderLayout from "@/components/Client/ClientLayout/ClientLayout";
import ProtectedRouteClient from "@/components/ProtectedRoute/ProtectedRoute";
const UserRoute = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/" element={<ClientHeaderLayout />}>
                <Route index element={<Home />} />
                <Route path="/services/:categoryId/:title" element={<ServicesList />}></Route>
                <Route path="/services" element={<ServicesList />}></Route>
                <Route path="/serviceBooking/:serviceId/:vendorId" element={<ServiceBooking />}></Route>
                <Route path="/categories" element={<CategoryListing />}></Route>
            </Route>
            <Route path="/profile/*" element={<ProtectedRouteClient><ClientLayout /> </ProtectedRouteClient>}>
                <Route path="bookings" element={<ProtectedRouteClient><BookingListing /></ProtectedRouteClient>} ></Route>
                <Route path="home" element={<ProtectedRouteClient><UserProfile /></ProtectedRouteClient>} ></Route>
                <Route path="changePassword" element={<ProtectedRouteClient><PasswordChange /></ProtectedRouteClient>} ></Route>
                {/* <Route path="logout" element={<LogoutConfirmation/>} ></Route> */}
            </Route>
        </Routes>
    )
}

export default UserRoute