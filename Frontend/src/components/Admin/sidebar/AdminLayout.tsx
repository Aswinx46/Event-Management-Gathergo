import { Outlet } from "react-router"
import Sidebar from "./AdminSideBar";
export default function AdminLayout() {
    return (
        <div className="w-screen flex">
            <Sidebar />
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
}