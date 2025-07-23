import React, { useState } from 'react';
import { Link, NavLink, useLocation, useResolvedPath, useMatch } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';
import Logout from '../../profile/component/Logout';

const Navigation = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleOpenPopup = () => setIsLogoutPopupOpen(true);
    const handleClosePopup = () => setIsLogoutPopupOpen(false);


    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    // Active link logic
    const isActive = (path) => location.pathname === path ? 'nav-link-active' : '';

    // For matching paths
    const { pathname } = useResolvedPath('');
    const matchProfile = useMatch(`${pathname}/my-account/profile`);
    const matchOrders = useMatch(`${pathname}/my-account/orders`);
    const matchAddressBook = useMatch(`${pathname}/my-account/address-book`);

    const matchHome = useMatch(`${pathname}/`);
    const matchAbout = useMatch(`${pathname}/about`);
    const matchContact = useMatch(`${pathname}/contact`);
    const matchSignUp = useMatch(`${pathname}/register`);


    return (
        <>
            {/* Hamburger Button for small screens */}
            <button
                className="lg:hidden text-2xl z-50  text-black rounded-lg"
                onClick={toggleSidebar}
            >
                <FiMenu />
            </button>

            {/* Sidebar for small screens */}
            <nav
                className={`fixed top-0 left-0 w-64 h-full z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:hidden bg-white text-black/50 text-sm font-light font-['Poppins']`}
            >
                <div className="p-5">
                    <button onClick={toggleSidebar} className="text-2xl mb-4 focus:outline-none">
                        <AiOutlineClose />
                    </button>
                    <p className="text-black text-base font-medium leading-normal mb-4 px-6">

                    </p>
                    <ul className="space-y-4 px-6">
                        <li>
                            <NavLink
                                to="/"
                                className={`block ${matchHome ? 'text-primary font-normal' : ''}`}
                                onClick={toggleSidebar}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={`block ${matchContact ? 'text-primary font-normal' : ''}`}
                                onClick={toggleSidebar}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={`block ${matchAbout ? 'text-primary font-normal' : ''}`}
                                onClick={toggleSidebar}
                            >
                                About Us
                            </NavLink>
                        </li>
                        {!user && (
                            <li>
                                <NavLink
                                    to="/register"
                                    className={`block ${matchSignUp ? 'text-primary font-normal' : ''}`}
                                    onClick={toggleSidebar}
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    
                    {user && (
                        <>
                            <p className="text-black text-base font-medium leading-normal mt-4 mb-4 px-6">
                                Manage My Account
                            </p>
                            <ul className="space-y-4 px-6">
                                <li>
                                    <NavLink
                                        to="/my-account/profile"
                                        className={`block ${matchProfile ? 'text-primary font-normal' : ''}`}
                                        onClick={toggleSidebar}
                                    >
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-account/address-book"
                                        className={`block ${matchAddressBook ? 'text-primary font-normal' : ''}`}
                                        onClick={toggleSidebar}
                                    >
                                        Address Book
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-account/orders"
                                        className={`block ${matchOrders ? 'text-primary font-normal' : ''}`}
                                        onClick={toggleSidebar}
                                    >
                                        My Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            toggleSidebar();
                                            handleOpenPopup();
                                        }}
                                        className="w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}

                </div>
            </nav>

            {/* Normal navigation links for larger screens */}
            <div className='hidden lg:flex space-x-6 mr-5 xl:mr-auto'>
                <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
                <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
                {!user && (
                    <Link to="/register" className={`nav-link ${isActive('/register')}`}>
                        Sign Up
                    </Link>
                )}
            </div>

            {/* Background overlay when the sidebar is open (mobile view) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <Logout
                isOpen={isLogoutPopupOpen}
                onClose={handleClosePopup}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default Navigation;
