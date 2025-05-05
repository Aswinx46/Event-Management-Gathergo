import { Outlet } from "react-router-dom";
import { Sidebar } from './Sidebar'
export default function VendorLayout() {
    return (
        <div className="w-full flex">
            <Sidebar />
            <div className="grow h-[100vh] overflow-y-scroll hide-scrollbar">
                <Outlet />
            </div>
        </div>
    )
}