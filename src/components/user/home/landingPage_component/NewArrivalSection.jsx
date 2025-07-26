import React from 'react'
import ArrivalCards from './ArrivalSections'

const NewArrivalSection = ({ title, subtitle }) => {

    return (
        <div className="mt-16 bg-white">
            <div className="xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
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
                        <p className="text-gray-600 mt-2 font-Poppins text-sm sm:text-base">
                            Explore bamboo and clay products to add a natural, earthy touch to
                            your home.
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                <div className='relative'>
                    <ArrivalCards />
                </div>
            </div>
        </div>
    )
}

export default NewArrivalSection
