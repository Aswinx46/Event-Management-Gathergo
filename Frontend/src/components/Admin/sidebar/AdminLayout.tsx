import { Outlet } from "react-router"
import Sidebar from "./AdminSideBar";
export default function AdminLayout() {
    return (
        <div className="w-full flex">
            <Sidebar />
            <div className="grow h-screen overflow-y-scroll hide-scrollbar">
                <Outlet />
            </div>
        </div>
    );
}