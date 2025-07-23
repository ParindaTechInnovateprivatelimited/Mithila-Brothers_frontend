import React from 'react';
import BrandLogo from '../header_component/BrandLogo';
import Navigation from '../header_component/Navigation';
import UserActions from '../header_component/UserAction';
import SearchBar from '../header_component/SearchBar';

const Header = () => {

  return (
    <div className='fixed z-20 w-full sm:pt-[40px]  sm:pb-[16px] bg-wht border-b'>
      <div>
        <header className="bg-none text-[#2F2F2F] py-4 sm:py-0 px-[10px] xl:px-[135px] lg:px-[100px] md:px-[60px] flex justify-between items-center">
        <div className='flex gap-2 '>
        <div className='lg:hidden my-auto align-middle  pt-2 border-black h-auto'>
          <Navigation />
          </div>
          <div className='text-2xl'>
            <BrandLogo />
          </div>
        </div>
          <div className="flex items-center sm:justify-between gap-4 lg:gap-1 xl:gap-28">
          <div className='hidden lg:block'>
          <Navigation />
          </div>
            <UserActions />
          </div>
        </header>
        <div className='px-5 pb-3 sm:hidden'>
        <SearchBar/>
        </div>
      </div>
    </div>
  );
};

export default Header;
