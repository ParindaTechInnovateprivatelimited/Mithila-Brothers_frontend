import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const Error404 = () => {
    return (
        <div className='xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]'>
            <div className="lg:mt-[70px] sm:mt-[60px]"><Breadcrumbs /></div>
            <div className="flex items-center lg:my-[140px] sm:my-[70px] my-[40px] font-Inter justify-center h-full">
                <div className="text-center">
                    <h1 className="lg:text-[110px] sm:text-[70px] text-[40px] font-normal">404 Not Found</h1>
                    <p className="text-[16px] mt-4">Your visited page not found. You may go home page.</p>

                    <a
                        href="/"
                        className="mt-12 inline-block px-[48px] py-[16px] bg-primary text-white text-sm rounded-lg hover:bg-primary/80"
                    >
                        Back to home page
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Error404;
