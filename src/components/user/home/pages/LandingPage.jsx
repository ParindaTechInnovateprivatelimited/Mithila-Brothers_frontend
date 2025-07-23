import React, { useCallback, useRef, useState } from 'react';
import HeroSection from '../landingPage_component/HeroSection';
import CategorySection from '../landingPage_component/CategorySection';
import Banner from '../../../../shared/Banner';
import CategoryPage from '../landingPage_component/CategoryPage';
import NewArrivalSection from '../landingPage_component/NewArrivalSection';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../../../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStar, FaGift, FaTruck, FaShieldAlt } from 'react-icons/fa';

const LandingPage = () => {
    const trendingRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            navigate('/product');
        }, 300);
    };

    useCallback(() => {
        dispatch(fetchCategory('newarrivals'));
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <section className="relative overflow-hidden">            
                <HeroSection />
            </section>

            {/* Features Section */}
            <section className="py-8 lg:py-12 bg-white">
                <div className="xl:mx-[135px] lg:mx-[100px] md:mx-[60px] mx-[20px]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        <div className="text-center group">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-accent rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FaTruck className="text-white text-lg lg:text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 lg:mb-2 text-sm lg:text-base">Free Shipping</h3>
                            <p className="text-xs lg:text-sm text-gray-600">On orders over Rs2000</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-accent rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FaShieldAlt className="text-white text-lg lg:text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 lg:mb-2 text-sm lg:text-base">Secure Payment</h3>
                            <p className="text-xs lg:text-sm text-gray-600">100% secure checkout</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-accent rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FaGift className="text-white text-lg lg:text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 lg:mb-2 text-sm lg:text-base">Gift Cards</h3>
                            <p className="text-xs lg:text-sm text-gray-600">Perfect for any occasion</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-accent rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FaStar className="text-white text-lg lg:text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 lg:mb-2 text-sm lg:text-base">Premium Quality</h3>
                            <p className="text-xs lg:text-sm text-gray-600">Curated collections</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flash Sales Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white">
                <div ref={trendingRef}>
                    <CategorySection
                        title="Flash Sales"
                        subtitle="Today's"
                        category="trending"
                        description="Explore the styles everyone's talking about! Limited time offers on trending products."
                    />
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 lg:py-16 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
                
                <div className="text-center xl:mx-[135px] lg:mx-[100px] md:mx-[60px] mx-[20px] relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6 backdrop-blur-sm">
                        <FaStar className="text-yellow-300" />
                        Limited Time Offer
                    </div>
                    <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 font-Inter leading-tight">
                       Bihar ki Sanskriti, Aapke Ghar Tak
                    </h3>
                    <p className="text-white/90 mb-6 lg:mb-10 font-Poppins text-base lg:text-xl max-w-2xl mx-auto">
                    Discover authentic Bihari flavors and traditional arts, delivered
                    to your doorstep.
                                        </p>
                    <button
                        className={`bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 rounded-full text-base lg:text-lg font-Poppins transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 lg:gap-3 mx-auto group
                        ${isClicked ? 'animate-click' : ''}`}
                        onClick={handleClick}
                        onAnimationEnd={() => setIsClicked(false)}
                    >
                        View All Products
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-8 lg:py-12">
                <CategoryPage
                    title="Browse By Category"
                    subtitle="Categories" 
                />
            </section>

            {/* Divider with style */}
            <div className="xl:mx-[135px] lg:mx-[100px] md:mx-[60px] mx-[20px] py-4 lg:py-6">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-primary rounded-full"></div>
                </div>
            </div>

            {/* Best Selling Products Section */}
            <section className="py-8 lg:py-12 bg-white">
                <CategorySection
                    title="Best Selling Products"
                    subtitle="This Month"
                    category='trendinng'
                    description="Bright, colorful paintings that share stories of festivals, nature, and village life."
                />
            </section>

            {/* Promotional Banner Section */}
            <section className="py-8 lg:py-12">
                <div className='xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]'>
                    <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] group">
                        <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                            alt="Special Offer Banner"
                            className='w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-700'
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                        
                        {/* Content overlay */}
                        <div className="absolute inset-0 flex items-center p-6 lg:p-8 xl:p-16">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-3 lg:mb-4">
                                    <FaGift className="text-yellow-300" />
                                    Special Offer
                                </div>
                                <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                                Bihari Taste Delights                                </h2>
                                <p className="text-white/90 text-sm lg:text-lg mb-4 lg:mb-6">
                                Discover our traditional snacks, made from original recipes passed
                                down through generations.                                </p>
                                <button                         onClick={handleClick}
 className="bg-white text-primary hover:bg-gray-100 font-semibold py-2.5 px-6 lg:py-3 lg:px-7 xl:py-4 xl:px-8 rounded-full text-sm lg:text-base xl:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                                    Shop Now
                                    <FaArrowRight className="text-xs lg:text-sm" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Products Section */}
            <section className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white">
                <CategorySection
                    title="Explore Our Products"
                    subtitle="Our Products"
                    category="trendig"
                    description="Discover our traditional snacks, made from original recipes passed
down through generations."
                />
            </section>

            {/* Second Call to Action */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
                
                <div className="text-center xl:mx-[135px] lg:mx-[100px] md:mx-[60px] mx-[20px] relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6 backdrop-blur-sm">
                        <FaStar className="text-yellow-300" />
                        Premium Collection
                    </div>
                    <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 font-Inter leading-tight">
                    Handmade Home Treasures                    </h3>
                    <p className="text-gray-300 mb-6 lg:mb-10 font-Poppins text-base lg:text-xl max-w-2xl mx-auto">
                    Explore bamboo and clay products to add a natural, earthy touch to
                    your home.                    </p>
                    <button
                        className={`bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 rounded-full text-base lg:text-lg font-Poppins transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 lg:gap-3 mx-auto group
                        ${isClicked ? 'animate-click' : ''}`}
                        onClick={handleClick}
                        onAnimationEnd={() => setIsClicked(false)}
                    >
                        Explore All Products
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-8 lg:py-12">
                <NewArrivalSection title='New Arrival' subtitle="Featured" />
            </section>

            {/* Banner Section */}
            <section className="py-8 lg:py-12">
                <Banner />
            </section>
        </div>
    );
};

export default LandingPage;
