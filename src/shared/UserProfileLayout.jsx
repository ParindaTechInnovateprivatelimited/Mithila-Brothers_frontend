import { useSelector } from "react-redux";
import Breadcrumbs from "./Breadcrumbs";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const UserProfileLayout = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <div className="sm:mb-[140px] sm:mt-[80px] xl:px-[135px] lg:px-[100px] md:px-[60px] px-[10px]">
            <div className="   flex flex-col md:flex-row sm:justify-between sm:items-center font-Poppins">
                <Breadcrumbs />
                <p className="mt-2 md:mt-0 text-center sm:text-justify">Welcome! <span className="text-primary">{user.firstName}</span></p>
            </div>
            <div className="my-5 flex flex-col md:flex-row justify-between h-full">
                <Sidebar className="md:w-1/4  lg:w-1/5" />
                <div className="w-full shadow-md drop-shadow-sm rounded lg:w-4/5">
                    <Outlet />
                </div>
            </div>
            </div>
        </>
    );
};

export default UserProfileLayout;
