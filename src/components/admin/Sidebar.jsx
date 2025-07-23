import { NavLink, useMatch, useResolvedPath } from "react-router-dom";


import { AiOutlineHome, AiOutlineSearch, AiOutlineGift } from "react-icons/ai";
import { RiLayoutHorizontalLine, RiShoppingBag3Line, RiUser3Line, RiLogoutBoxRLine } from "react-icons/ri";
import toast from "react-hot-toast";



const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        window.location.reload();
    };

    const { pathname } = useResolvedPath('');
    const matchDashboard = useMatch(`${pathname}/dashboard`);
    const matchOrders = useMatch(`${pathname}/orders`);
    const matchCustomers = useMatch(`${pathname}/customers`);

    const matchProducts = useMatch(`${pathname}/products`);

    const matchSearch = useMatch(`${pathname}/search`);

    const matchCampaign = useMatch(`${pathname}/campaign`);


    const showLogoutToast = () => {
        toast((t) => (
            <div className="flex flex-col items-center p-3 space-y-4">
                <p className="text-md">Are you sure you want to logout?</p>
                <div className="flex space-x-4">
                    <button
                        className="px-5 py-2 bg-primary text-white rounded"
                        onClick={() => {
                            handleLogout();
                            toast.dismiss(t.id);
                        }}
                    >
                        Logout
                    </button>
                    <button
                        className="px-5 py-2 bg-gray-300 rounded"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'top-center',
        });
    };

    return (
        <>
            <nav className="h-screen  text-black/50 text-sm text-center font-light font-Poppins">
                <h1 className=" text-white text-[25px] mt-10 mb-20 font-bold font-Inter leading-9">Admin</h1>
                <ul className="space-y-4 m-[20px] font-normal">
                    {/* <li className="w-full">
                        <NavLink
                            to="dashboard"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchDashboard ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <AiOutlineHome className="text-3xl" />
                        </NavLink>
                    </li> */}
                    {/* <li className="w-full">
                        <NavLink
                            to="orders"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchOrders ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <RiLayoutHorizontalLine className="text-3xl" />
                        </NavLink>
                    </li> */}
                    {/* <li className="w-full">
                        <NavLink
                            to="products"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchProducts ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <RiShoppingBag3Line className="text-3xl" />
                        </NavLink>
                    </li> */}
                    {/* <li className="w-full">
                        <NavLink
                            to="customers"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchCustomers ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <RiUser3Line className="text-3xl" />
                        </NavLink>
                    </li> */}
                    {/* <li className="w-full">
                        <NavLink
                            to="search"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchSearch ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <AiOutlineSearch className="text-3xl" />
                        </NavLink>
                    </li> */}
                    <li className="w-full">
                        <NavLink
                            to="campaign"
                            className={`flex items-center justify-center h-[52px] rounded-lg ${matchCampaign ? 'bg-white text-primary font-normal shadow-md backdrop-blur-md' : 'text-white bg-[#ffffff52]'}`}
                        >
                            <AiOutlineGift className="text-3xl" />
                        </NavLink>
                    </li>

                    <li>
                        <button
                            onClick={showLogoutToast}
                            className="w-full h-[52px] rounded-lg bg-[#ffffff52] focus:bg-white focus:text-primary text-white  active:bg-[#f0f0f0] active:text-[#d32f2f] focus:outline-none"
                        >
                            <RiLogoutBoxRLine className="text-3xl m-auto align-middle " />
                        </button>

                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;




