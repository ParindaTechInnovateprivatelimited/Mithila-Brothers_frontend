import React from 'react';
import { Link } from 'react-router-dom';
// import logo from "../../../assets/images/ha_logo.png"

const BrandLogo = () => {
    return (
        <Link to='/' className="flex items-center space-x-2">
        <img
            src='Logo.png'
            alt="Mithila Brothers Logo"
            className="w-10 h-10 object-contain"
        />
        <h1 className="text-black line-clamp-1 text-2xl font-bold leading-normal tracking-wide">
            Mithila Brothers
        </h1>
    </Link>
    );
};

export default BrandLogo;
