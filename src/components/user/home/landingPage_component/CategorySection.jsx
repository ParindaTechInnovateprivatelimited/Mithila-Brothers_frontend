import React, { useRef } from 'react';
import ProductList from '../../product/component/ProductList';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

const CategorySection = ({ title, subtitle, category, description }) => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="mt-8 sm:mt-16">
            <div className="xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                    <div className="flex-1">
                        <div className="text-primary text-sm font-semibold font-Poppins uppercase tracking-wider mb-1">
                            {subtitle}
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-Inter leading-tight">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-gray-600 line-clamp-1 mt-2 font-Poppins text-sm sm:text-base">
                                {description}
                            </p>
                        )}
                    </div>

                    {category === 'trending' && (
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
                    )}
                </div>

                {/* Products Section */}
                <ProductList category={category} ref={scrollContainerRef} />
            </div>
        </div>
    );
};

export default CategorySection;
