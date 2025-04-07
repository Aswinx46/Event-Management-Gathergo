import { Outlet } from "react-router-dom";
import { ClientSidebar } from "./ClientSidebar";
export default function ClientLayout() {
    return (
        <div className="w-screen flex">
            <ClientSidebar />
            <div className="grow">
                <Outlet />
            </div>
        </div>
    )
}