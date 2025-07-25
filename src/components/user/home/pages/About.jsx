import React from 'react';
import Banner from '../../../../shared/Banner';
import Breadcrumbs from '../../../../shared/Breadcrumbs';
import { TbMoneybag } from "react-icons/tb";
import { HiOutlineCurrencyRupee, HiOutlineShoppingBag } from "react-icons/hi2";
import { RiInstagramLine, RiTwitterLine, RiLinkedinLine } from "react-icons/ri";
import { BiStoreAlt } from "react-icons/bi";



const About = () => {
    return (
        <div className="lg:mt-[80px] mb-[60px]">
            <div className="xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
                <Breadcrumbs />
            </div>
            <div className="space-y-[140px]">
                <div className="flex flex-col md:flex-row items-center gap-8 xl:pl-[135px] lg:pl-[100px] md:pl-[60px] pl-[20px] sm:pr-0 pr-[20px]">
                    <div className="md:w-1/2 my-auto">
                        <h2 className="text-[54px] font-Inter tracking-[3.24px] font-bold text-black mb-[40px]">Ours Story</h2>
                        <p className="text-gray-600 text-base font-Poppins leading-relaxed">
                            Mithila Brothers is a dream to bring Bihar closer to every heart, no matter
                            where you live. Many of us miss our villages — the sweet smell of
                            Thekua, the crunch of Makhana, the bright colors of Madhubani paintings,
                            the joy of festivals.
                        </p>
                        <br />
                        <p className="text-gray-600 font-Poppins text-base leading-relaxed">
                            We work directly with farmers, women’s groups, and artisans across Bihar.
                            Every product tells a story of tradition, love, and pride. Our mission is to
                            make every Bihari feel connected to their roots and help local families
                            grow stronger.
                        </p>
                        <br />
                        <p className="text-gray-600 font-Poppins text-base leading-relaxed">
                            When you shop with us, you don’t just buy a product — you support a
                            family, you keep an art alive, and you celebrate Bihar.
                        </p>
                    </div>
                    {/* <div className="md:w-1/2 h-[550px] mx-auto border">
                        <img
                            src="Logo.png"
                            alt="Our Story"
                            className="w-full object-cover rounded-l h-[609px]"
                        />
                    </div> */}
                    <div className="md:w-1/2 max-h-[550px] h-full mx-auto flex items-center justify-center">
                        <img
                            src="Logo.png"
                            alt="Our Story"
                            className="max-w-[500px] w-full max-h-[500px] h-full object-cover rounded-l"
                        />
                    </div>

                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
                    <div className="bg-white w-[270px] py-5 mx-auto h-[230px] border rounded shadow text-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out group">
                        <div className="p-2 bg-black/50 group-hover:bg-white/50 h-20 w-20 rounded-full mb-[24px] mx-auto transition-all duration-300 ease-in-out">
                            <BiStoreAlt className="h-full w-full group-hover:bg-white group-hover:text-black bg-black text-white py-3 rounded-full mx-auto transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-white transition-all duration-300 ease-in-out">100+</div>
                        <p className="text-gray-600 text-sm group-hover:text-white transition-all duration-300 ease-in-out">Brand Sells active on our site</p>
                    </div>

                    <div className="bg-white w-[270px] py-5 mx-auto h-[230px] border rounded shadow text-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out group">
                        <div className="p-2 bg-black/50 group-hover:bg-white/50 h-20 w-20 rounded-full mb-[24px] mx-auto transition-all duration-300 ease-in-out">
                            <HiOutlineCurrencyRupee className="h-full w-full group-hover:bg-white group-hover:text-black bg-black text-white p-2 rounded-full mx-auto transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-white transition-all duration-300 ease-in-out">1.0K</div>
                        <p className="text-gray-600 text-sm group-hover:text-white transition-all duration-300 ease-in-out">Monthly product sales</p>
                    </div>

                    <div className="bg-white w-[270px] py-5 mx-auto h-[230px] border rounded shadow text-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out group">
                        <div className="p-2 bg-black/50 group-hover:bg-white/50 h-20 w-20 rounded-full mb-[24px] mx-auto transition-all duration-300 ease-in-out">
                            <HiOutlineShoppingBag className="h-full w-full group-hover:bg-white group-hover:text-black bg-black text-white py-3 rounded-full mx-auto transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-white transition-all duration-300 ease-in-out">3.8K</div>
                        <p className="text-gray-600 text-sm group-hover:text-white transition-all duration-300 ease-in-out">Customers active on our site</p>
                    </div>

                    <div className="bg-white w-[270px] py-5 mx-auto h-[230px] border rounded shadow text-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out group">
                        <div className="p-2 bg-black/50 group-hover:bg-white/50 h-20 w-20 rounded-full mb-[24px] mx-auto transition-all duration-300 ease-in-out">
                            <TbMoneybag className="h-full w-full group-hover:bg-white group-hover:text-black bg-black text-white p-3 rounded-full mx-auto transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-white transition-all duration-300 ease-in-out">&#8377;10L+</div>
                        <p className="text-gray-600 text-sm group-hover:text-white transition-all duration-300 ease-in-out">Annual gross sales on our site</p>
                    </div>
                </div>


                {/* Founder and Co-founder Section */}
                <div className="flex flex-col md:flex-row items-center justify-around gap-8 xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
                    <div className="tr">
                        <img
                            src="https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753384981/IMG_1717_vr3bmg.png"
                            alt="Founder"
                            className="w-[370px] h-[430px] object-cover rounded mx-auto"
                        />
                        <h3 className="text-[32px] font-Inter font-normal leading-[30px] tracking-wider mt-[32px]">Amar Kumar</h3>
                        <p className=" text-black text-base font-normal font-Poppins leading-normal">Founder</p>
                        {/* <div className="flex justify-start gap-4 mt-[5px]">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xl cursor-pointer">
                                <RiTwitterLine />
                            </a>
                            <a href="https://www.instagram.com/rahulk.softdev" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-xl cursor-pointer">
                                <RiInstagramLine />
                            </a>
                            <a href="https://www.linkedin.com/in/rahul-kumar-2bb72b29b/" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xl cursor-pointer" >
                                <RiLinkedinLine />
                            </a>
                        </div> */}
                    </div>
                    <div className="t">
                        <img
                            src="https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753384981/IMG_1718_eiunkg.png"
                            alt="Co-Founder"
                            className="w-[370px] h-[430px] object-cover rounded mx-auto"
                        />
                        <h3 className="text-[32px] font-Inter font-normal leading-[30px] tracking-wider mt-[32px]">Anshu Ranjan</h3>
                        <p className="text-black text-base font-normal font-Poppins leading-normal">Co-Founder</p>
                        {/* <div className="flex justify-start gap-4 mt-[5px]">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xl cursor-pointer">
                                <RiTwitterLine />
                            </a>
                            <a href=" https://www.instagram.com/aditya_p____0_9/" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-xl cursor-pointer">
                                <RiInstagramLine />
                            </a>
                            <a href="https://www.linkedin.com/in/rahul-kumar-2bb72b29b/" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xl cursor-pointer">
                                <RiLinkedinLine />
                            </a>
                        </div> */}
                    </div>
                    <div className="t">
                        <img
                            src="https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753384981/IMG_1719_vmmftj.png"
                            alt="Co-Founder"
                            className="w-[350px] h-[430px] object-fill blur-[1px]  rounded mx-auto"
                        />
                        <h3 className="text-[32px] font-Inter font-normal leading-[30px] tracking-wider mt-[32px]">Nawnit kumar</h3>
                        <p className="text-black text-base font-normal font-Poppins leading-normal">Founder</p>
                        {/* <div className="flex justify-start gap-4 mt-[5px]">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xl cursor-pointer">
                                <RiTwitterLine />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-xl cursor-pointer">
                                <RiInstagramLine />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xl cursor-pointer">
                                <RiLinkedinLine />
                            </a>
                        </div> */}
                    </div>
                </div>
                <Banner />
            </div>
        </div>
    )
}

export default About;
