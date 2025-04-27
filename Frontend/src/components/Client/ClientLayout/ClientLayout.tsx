import { Outlet } from "react-router-dom";
import Header from '../Header/Header'
export default function ClientHeaderLayout() {
    return (
        <div className="w-full flex flex-col">
            <Header />
            <div className="grow">
                <Outlet />
            </div>
            
        </div>
    )
}