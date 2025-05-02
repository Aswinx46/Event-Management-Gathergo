import { Outlet } from "react-router-dom";
import Header from '../Header/Header'
import Footer from "../Footer/Footer";
export default function ClientHeaderLayout() {
    return (
        <div className="w-full flex flex-col">
            <Header />
            <div className="grow">
                <Outlet />
            </div>
            <Footer/>
        </div>
    )
}