import { Outlet } from "react-router-dom";
import { ClientSidebar } from "./ClientSidebar";
export default function ClientLayout() {
    return (
        <div className="w-full flex">
            <ClientSidebar />
            <div className="grow h-[100vh] overflow-y-scroll hide-scrollbar">
                <Outlet />
            </div>
        </div>
    )
}