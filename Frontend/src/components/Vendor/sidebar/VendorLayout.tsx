import { Outlet } from "react-router-dom";
import { Sidebar } from './Sidebar'
export default function VendorLayout() {
    return (
        <div className="w-screen flex">
            <Sidebar />
            <div className="grow">
                <Outlet />
            </div>
        </div>
    )
}