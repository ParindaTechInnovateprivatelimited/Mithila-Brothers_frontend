import React, { useRef } from 'react';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import { FaShoePrints, FaTshirt, FaShoppingBag, FaHandHolding } from 'react-icons/fa';
import { PiPantsThin, PiDressThin, PiBeltThin, PiTShirtThin } from "react-icons/pi";
import { GiSleevelessJacket, GiSkirt, GiSunglasses, GiWatch } from "react-icons/gi";
import { Link } from 'react-router-dom';

const CategoryPage = ({ title, subtitle }) => {
    const scrollContainerRef = useRef(null);

    const categories = [
        { name: 'Pants', icon: <PiPantsThin />, link: '/66f05bff7540dd76b4347c26/66f05c3e7540dd76b4347c57', color: 'from-blue-500 to-blue-600' },
        { name: 'Frocks', icon: <PiDressThin />, link: '/66f05c077540dd76b4347c2a/6714b71ce01f6977e2202818', color: 'from-pink-500 to-pink-600' },
        { name: 'Dresses', icon: <PiDressThin />, link: '/66f05c077540dd76b4347c2a/66f728a8e6c4ed7ebcae5410', color: 'from-purple-500 to-purple-600' },
        { name: 'Tops', icon: <PiTShirtThin />, link: '/66f05c077540dd76b4347c2a/66f71dec5121941c84230b39', color: 'from-green-500 to-green-600' },
        { name: 'Accessories', icon: <FaShoppingBag />, link: '/671616df17fc5f1bd6b68e95', color: 'from-yellow-500 to-yellow-600' },
        { name: 'T-shirts', icon: <FaTshirt />, link: '/66f05bff7540dd76b4347c26/6700e5f5fd42daee87d25df0', color: 'from-red-500 to-red-600' },
        { name: 'Jeans', icon: <PiPantsThin />, link: '/66f05bff7540dd76b4347c26/66f05c257540dd76b4347c39', color: 'from-indigo-500 to-indigo-600' },
    ];

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="mt-16 xl:px-[135px] lg:px-[100px] font-Poppins md:px-[60px] px-[20px] bg-gradient-to-br from-gray-50 to-white py-12">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <div className="flex-1">
                    <div className="text-primary text-sm font-semibold font-Poppins uppercase tracking-wider mb-1">
                        {subtitle}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-Inter leading-tight">
                        {title}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button
                        className="bg-white border border-gray-200 hover:border-primary hover:bg-primary hover:text-white rounded-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={scrollLeft}
                    >
                        <GoArrowLeft className='h-5 w-5' />
                    </button>
                    <button
                        className="bg-white border border-gray-200 hover:border-primary hover:bg-primary hover:text-white rounded-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={scrollRight}
                    >
                        <GoArrowRight className='h-5 w-5' />
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className='overflow-x-auto no-scrollbar' ref={scrollContainerRef}>
                <div className='flex gap-6 pb-4'>
                    {categories.map((category, index) => (
                        <Link to={category.link} key={index} className="flex-shrink-0">
                            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                
                                {/* Content */}
                                <div className="relative p-8 text-center w-[200px] h-[180px] flex flex-col items-center justify-center">
                                    <div className={`text-5xl mb-4 text-text2 group-hover:text-primary transition-colors duration-300 group-hover:scale-110 transform`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-semibold text-text1 group-hover:text-primary transition-colors duration-300 text-lg">
                                        {category.name}
                                    </h3>
                                    
                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary group-hover:w-16 transition-all duration-300"></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
