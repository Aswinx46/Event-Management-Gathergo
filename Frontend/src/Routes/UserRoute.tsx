import { Route,Routes } from "react-router-dom";
import Signup from "../components/Client/Signup/Signup";
import LoginComponent from "@/components/Client/Login/Login";
import Home from "@/components/Client/home/Home";
const UserRoute=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<LoginComponent/>}></Route>
        </Routes>
    )
}

export default UserRoute