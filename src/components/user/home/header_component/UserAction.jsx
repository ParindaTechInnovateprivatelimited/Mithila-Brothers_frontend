import React, { useState } from 'react';
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Modals from '../../../../shared/Modal';
import Login from '../../auth/component/Login';
import Register from '../../auth/component/Register';
import SearchBar from './SearchBar';

const UserActions = () => {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const itemCount = useSelector((state) => state.cart.itemCount);
    const user = useSelector((state) => state.auth.user);

    const switchToRegister = () => setIsLogin(false);
    const switchToLogin = () => setIsLogin(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserIconClick = () => {
        if (user) {
            navigate('/my-account');
        } else {
            handleOpen();
        }
    };

    return (
        <div className='sm:gap-3 gap-1 flex border-black'>
            <div className='hidden sm:block'>
            <SearchBar />
            </div>
            <Link to="/wishlist" className="relative flex">
                <IoMdHeartEmpty className='sm:h-[24px] sm:w-[24px] h-[20px] w-[20px] border-black my-auto' />
            </Link>
            <Link to="/cart" className="relative flex">
                <IoCartOutline className='sm:h-[24px] sm:w-[24px] h-[20px] w-[20px] my-auto' />
                <p className='bg-primary text-sm h-5 w-5 text-center text-white rounded-full font-Poppins'>{itemCount}</p>
            </Link>
            <button onClick={handleUserIconClick}>
                <FiUser className='sm:h-8 sm:w-8 h-7 w-7 p-1.5 align-middle rounded-full bg-primary text-white text-xs border-black my-auto' />
            </button>
            <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Login Modal">
                {isLogin ? (
                    <Login switchToRegister={switchToRegister} />
                ) : (
                    <Register switchToLogin={switchToLogin} />
                )}
            </Modals>
        </div>
    );
};

export default UserActions;
