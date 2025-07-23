import React from 'react';
import { Link } from 'react-router-dom';
// import logo from "../../../assets/images/ha_logo.png"

const BrandLogo = () => {
    return (
        <Link to='/'>
            <h1 className="text-black text-2xl font-bold leading-normal tracking-wide">Mithila Brothers</h1>
        </Link>
    );
};

export default BrandLogo;
