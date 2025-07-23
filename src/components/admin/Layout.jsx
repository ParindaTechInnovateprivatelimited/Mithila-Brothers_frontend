import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = () => {

    
    return (
        <>
        <Toaster />
            <div className="min-h-screen h-full ">
            <div className="flex flex-col md:flex-row h-full">
                <div className="w-[100px] fixed h-full bg-primary">
                    <Sidebar />
                </div>
                <div className=" w-full ml-[100px]  h-full ">
                    <Outlet />
                </div>
            </div>
            </div>
        </>
    );
};

export default Layout;
