import React from 'react'

import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";





const Banner = () => {
    return (
        <div className='bg-none sm:py-[0px] sm:px-[100px] py-0 font-Poppins w-full xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]'>
            <div className='grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 mx-auto text-center text-[#555555] text-xl leading-tight gap-20'>
                <div>
                <TbTruckDelivery className='h-20 w-20 bg-black text-text-inverse p-3 rounded-full border-8 border-white/50 mb-5 mx-auto' />
                    <p className='text-text1 text-xl font-semibold font-Poppins leading-7 uppercase'>Directly village to your home</p>
                    <p className='text-center text-text2 text-sm font-normal font-Poppins leading-[21px]'>Beautiful, eco-friendly packaging inspired by Madhubani art</p>
                </div>
                <div>
                <RiCustomerService2Line className='h-20 w-20 bg-black text-text-inverse p-3 rounded-full border-8 border-white/50 mb-5 mx-auto' />
                    <p className='text-black text-xl font-semibold font-Poppins leading-7'>LOCAL SUPPORT</p>
                    <p className='text-center text-black text-sm font-normal font-Poppins leading-[21px]'>Supports local farmers and artisans</p>
                </div>
                <div>
                <AiOutlineSafetyCertificate className='h-20 w-20 bg-black text-text-inverse p-3 rounded-full border-8 border-white/50 mb-5 mx-auto' />
                    <p className='text-black text-xl font-semibold font-Poppins leading-7'>AUTHENTIC PRODUCTS</p>
                    <p className='text-center text-black text-sm font-normal font-Poppins leading-[21px]'>100% authentic Bihari products</p>
                </div>
            </div>
        </div>
    )
}

export default Banner
