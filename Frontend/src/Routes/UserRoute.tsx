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
import ClientHeaderLayout from "@/components/Client/ClientLayout/ClientLayout";
import ProtectedRouteClient from "@/components/ProtectedRoute/ProtectedRoute";
import BlockedScreen from "@/components/other components/UserBlockNotice";
import NotFound from "@/components/other components/NotFound";
import ChangePasswordClient from "@/components/Client/profile/ChangePasswordClient";
import EventListingMain from "@/components/Client/events/EventListingMain";
import EventDetails from "@/components/Client/events/EventBookingDetails";
import BookedEvents from "@/components/Client/profile/eventListing/BookedEventsClient";
import ClientWallet from "@/components/Client/profile/wallet/ClientWallet";
import TicketPaymentForm from "@/components/Client/paymentForm/TicketPaymentForm";
import BookingPayment from "@/components/Client/bookingListing/BookingPayment";
import ShowEventsNearYou from "@/components/Client/events/ShowEventsNearYou";
import ClientChatAndMessage from "@/components/Client/ClientChat/ClientChatAndMessage";
import VendorDetails from "@/components/Client/vendorProfile/VendorProfile";
// import WalletPayment from "@/components/other components/wallet/WalletPaymentComponent";
const UserRoute = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/userBlockNotice" element={<BlockedScreen />}></Route>
            <Route path="/" element={<ClientHeaderLayout />}>
                <Route index element={<Home />} />
                <Route path="/services/:categoryId/:title" element={<ServicesList />}></Route>
                <Route path="/services" element={<ServicesList />}></Route>
                <Route path="/serviceBooking/:serviceId/:vendorId" element={<ServiceBooking />}></Route>
                <Route path="/categories" element={<CategoryListing />}></Route>
                <Route path="/events" element={<EventListingMain />}></Route>
                <Route path="/event/:eventId" element={<EventDetails />}></Route>
                <Route path="/ticketPayment" element={<ProtectedRouteClient><TicketPaymentForm /></ProtectedRouteClient>}></Route>
                {/* <Route path="/ticketPaymentWallet" element={<ProtectedRouteClient><WalletPayment /></ProtectedRouteClient>}></Route> */}
                <Route path="/eventsNearToYou" element={<ShowEventsNearYou />}></Route>
                <Route path="/vendorProfile/:vendorId" element={<VendorDetails />}></Route>
            </Route>
            <Route path="/profile/*" element={<ProtectedRouteClient><ClientLayout /> </ProtectedRouteClient>}>
                {/* <Route path="chat/messages" element={<ProtectedRouteClient><ClientChat /></ProtectedRouteClient>}></Route> */}
                <Route path="bookings" element={<ProtectedRouteClient><BookingListing /></ProtectedRouteClient>} ></Route>
                <Route path="home" element={<ProtectedRouteClient><UserProfile /></ProtectedRouteClient>} ></Route>
                <Route path="changePassword" element={<ProtectedRouteClient><ChangePasswordClient /></ProtectedRouteClient>} ></Route>
                <Route path="bookedEvents" element={<ProtectedRouteClient><BookedEvents /></ProtectedRouteClient>} ></Route>
                <Route path="wallet" element={<ProtectedRouteClient><ClientWallet /></ProtectedRouteClient>} ></Route>
                <Route path="confirmBookingPayment" element={<ProtectedRouteClient><BookingPayment /></ProtectedRouteClient>} ></Route>
                <Route path="chats" element={<ProtectedRouteClient><ClientChatAndMessage /></ProtectedRouteClient>} ></Route>
                {/* <Route path="logout" element={<LogoutConfirmation/>} ></Route> */}
            </Route>
        </Routes>
    )
}

export default UserRoute