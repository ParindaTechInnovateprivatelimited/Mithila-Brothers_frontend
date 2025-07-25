import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { IoCallOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import Breadcrumbs from '../../../../shared/Breadcrumbs';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';


const ContactUs = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const sendEmail = async (e) => {
        e.preventDefault();
      
        const form = formRef.current;
        setLoading(true);
      
        // Validate environment variables
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const adminTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const senderTemplateId = process.env.REACT_APP_EMAILJS_SENDER_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      
        // Quick checks to avoid runtime errors
        if (!serviceId || !adminTemplateId || !senderTemplateId || !publicKey) {
          toast.error("Email service is not configured properly. Please try again later.");
          console.error("Missing one or more EmailJS environment variables", {
            serviceId,
            adminTemplateId,
            senderTemplateId,
            publicKey,
          });
          setLoading(false);
          return;
        }
      
        try {
          const adminPromise = emailjs.sendForm(
            serviceId,
            adminTemplateId,
            form,
            publicKey
          );
      
          const senderPromise = emailjs.sendForm(
            serviceId,
            senderTemplateId,
            form,
            publicKey
          );
      
          const combinedPromise = Promise.all([adminPromise, senderPromise]);
      
          toast.promise(combinedPromise, {
            loading: "Sending your message...",
            success: "Your message was sent successfully!",
            error: "Failed to send your message. Please try again later.",
          });
      
          await combinedPromise;
      
          form.reset();
        } catch (error) {
          console.error("Email sending failed:", error);
          toast.error(error?.text || "Something went wrong while sending your message.");
        } finally {
          setLoading(false);
        }
      };         

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
                        <p className="font-light leading-[21px] text-sm"><Link to='tel:+91 7808863077'>Phone: +91 7808863077</Link></p>
                        {/* <p className="font-light leading-[21px] text-sm"><Link to='tel:+91 9532196978'>Phone: +91 9532196978</Link></p> */}
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
                        <p className="font-light leading-[21px] text-sm"><Link to='mailto:mithilabrother.bihar25@gmail.com'>Emails: mithilabrother.bihar25@gmail.com</Link></p>
                        {/* <p className="font-light leading-[21px] text-sm">Emails: support@exclusive.com</p> */}
                    </div>
                </div>

                <div className="sm:w-3/5 md:w-[800px] w-full xl:h-[457px] shadow-md drop-shadow-sm p-4  sm:py-[40px]  lg:px-[32px]">
                    <form ref={formRef} className="space-y-[32px]" onSubmit={sendEmail}>
                        <div className='w-full grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 mb-6 gap-x-3 gap-y-6'>
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px]"
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Your Name *'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px]"
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder='Your Email *'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                className="py-[13px] bg-[#F5F5F5] outline-none px-[16px] sm:col-span-2 xl:col-span-1"
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                placeholder='Your Phone *'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <>
                            <textarea
                                className="w-full bg-[#F5F5F5] outline-none py-[13px] px-[16px]"
                                id="message"
                                name="message"
                                rows="7"
                                required
                                placeholder='Your Message'
                                value={formData.message}
                                onChange={handleChange}
                            >

                            </textarea>
                        </>
                        <>
                            <button
                                className={`w-full sm:w-auto bg-primary hover:bg-primary/80 font-TenorSans float-end text-[#FAFAFA] rounded px-[48px] py-[16px] font-medium flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''
                                    }`} type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
