import React from 'react';
import { Link } from 'react-router-dom'
import { IoCallOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import Breadcrumbs from '../../../../shared/Breadcrumbs';

const ContactUs = () => {

    return (
        <div className='xl:px-[135px] lg:px-[100px] md:px-[60px] mb-[100px] md:mb-[140px]  px-[20px]'>
            <div className=' md:my-[80px]'>
                <Breadcrumbs />
            </div>
            <div className="flex flex-col md:flex-row gap-y-[40px] sm:gap-y-0 border-black gap-x-[30px] justify-between ">
                {/* Contact Information Section */}
                <div className="md:w-[340px] w-full h-auto xl:h-[457px]  text-black font-normal shadow-md drop-shadow-sm py-[40px] px-[35px] bg-wht flex flex-col">
                    <div className='flex items-center gap-x-3 mb-5'>
                        <IoCallOutline className='text-2xl h-[40px] w-[40px] p-2 bg-primary text-white rounded-full' />
                        <div>
                            <h2 className="font-medium text-lg leading-normal mb-1">Call Us</h2>
                        </div>
                    </div>

                    <div className='space-y-[16px]'>
                        <p className=" font-light leading-[21px] text-sm">We are available 24/7, 7 days a week.</p>
                        <p className="font-light leading-[21px] text-sm"><Link to='tel:+91 9026478761'>Phone: +91 9026478761</Link></p>
                        <p className="font-light leading-[21px] text-sm"><Link to='tel:+91 9532196978'>Phone: +91 9532196978</Link></p>
                    </div>

                    <div className="border-t border-gray-300 my-[32px]"></div>
                    <div className='flex items-center gap-x-3 mb-5'>
                        <div className='text-2xl h-[40px] w-[40px] p-2 bg-primary text-white rounded-full py-auto border-black' >
                            <FaRegEnvelope className=' m-auto border-black' />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg leading-normal mb-1">Write to Us</h3>
                        </div>
                    </div>

                    <div className='space-y-[16px]'>
                        <p className='font-light leading-[21px] text-sm'>Fill out our form and we will contact you within 24 hours.</p>
                        <p className="font-light leading-[21px] text-sm"><Link to='mailto:marketing.mithilabrothers@gmail.com'>Emails: marketing.mithilabrothers@gmail.com</Link></p>
                        {/* <p className="font-light leading-[21px] text-sm">Emails: support@exclusive.com</p> */}
                    </div>
                </div>

                <div className="sm:w-3/5 md:w-[800px] w-full xl:h-[457px] shadow-md drop-shadow-sm p-4  sm:py-[40px]  lg:px-[32px]">
                    <form className="space-y-[32px] ">
                        <div className='w-full grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 mb-6 gap-x-3 gap-y-6'>
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px]"
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Your Name *'
                                required
                            />
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px]"
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder='Your Email *'
                            />
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px] sm:col-span-2 xl:col-span-1"
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                placeholder='Your Phone *'
                            />
                        </div>

                        <div>
                            <textarea
                                className="w-full bg-[#F5F5F5] outline-none py-[13px] px-[16px]"
                                id="message"
                                name="message"
                                rows="7"
                                required
                                placeholder='Your Message'
                            ></textarea>
                        </div>
                        <div>
                            <button
                                className=" w-full sm:w-auto bg-primary hover:bg-primary/80 font-TenorSans float-end text-[#FAFAFA] rounded px-[48px] py-[16px] font-medium "
                                type="submit"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
