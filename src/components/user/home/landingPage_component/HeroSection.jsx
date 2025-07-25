import React, { useState, useEffect } from 'react';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaShoppingBag, FaHeart, FaTshirt, FaShoePrints, FaGem, FaCrown, FaGift, FaStar as FaStarIcon } from 'react-icons/fa';
import { GiNecklace, GiSunglasses, GiWatch, GiHandBag } from 'react-icons/gi';

const Sidebar = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const { categories } = useSelector((state) => state.category);

    const handleCategoryClick = (index) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    // Category icons mapping
    const getCategoryIcon = (categoryName) => {
        const name = categoryName.toLowerCase();
        if (name.includes('clothing') || name.includes('dress') || name.includes('shirt')) return <FaTshirt />;
        if (name.includes('shoe') || name.includes('footwear')) return <FaShoePrints />;
        if (name.includes('jewelry') || name.includes('necklace')) return <GiNecklace />;
        if (name.includes('sunglass') || name.includes('eyewear')) return <GiSunglasses />;
        if (name.includes('watch') || name.includes('timepiece')) return <GiWatch />;
        if (name.includes('bag') || name.includes('handbag')) return <GiHandBag />;
        if (name.includes('accessory') || name.includes('accessories')) return <FaGem />;
        if (name.includes('premium') || name.includes('luxury')) return <FaCrown />;
        if (name.includes('gift') || name.includes('special')) return <FaGift />;
        return <FaShoppingBag />;
    };

    return (
        <div className="w-full  lg:w-2/6 xl:w-2/7 font-Poppins px-4 pt-2 lg:pt-6 xl:pt-8 h-full md:border-r border-gray-200/50">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-4 md:p-6 border-2 border-gray-300/50 mt-0 overflow-hidden max-h-[350px] md:max-h-[400px] 2xl:max-h-[650px] overflow-y-auto">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>

                {/* Header */}
                <div className="relative z-10 mb-4 md:mb-6 lg:mb-8">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 md:mb-2 flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl flex items-center justify-center">
                            <FaShoppingBag className="text-white text-sm md:text-lg lg:text-xl" />
                        </div>
                        <span >Categories</span>
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm lg:text-base  :block">Explore our curated collections</p>
                    <div className="w-12 h-1 md:w-16 lg:w-20 bg-gradient-to-r from-primary to-pink-500 rounded-full mt-2 md:mt-3"></div>
                </div>

                {/* Categories List */}
                <div className="relative z-10 space-y-2 md:space-y-3">
                    {categories?.map((category, index) => (
                        <div key={category._id} className="group">
                            <button
                                onClick={() => handleCategoryClick(index)}
                                onMouseEnter={() => setHoveredCategory(index)}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="w-full text-left py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 flex justify-between items-center group relative overflow-hidden"
                                style={{
                                    background: hoveredCategory === index
                                        ? 'linear-gradient(135deg, rgba(219, 68, 68, 0.1), rgba(219, 68, 68, 0.05))'
                                        : 'transparent'
                                }}
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Content */}
                                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 relative z-10">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 ${hoveredCategory === index
                                            ? 'bg-primary text-white scale-110'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {getCategoryIcon(category.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className={`font-semibold line-clamp-1 transition-colors duration-300 text-sm md:text-base lg:text-lg ${hoveredCategory === index
                                                ? 'text-primary'
                                                : 'text-gray-800'
                                            }`}>
                                            {category.name}
                                        </span>
                                        <div className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">
                                            {category.subCategories?.length || 0} items
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className={`transition-all duration-300 ${openCategory === index ? '-rotate-90' : 'rotate-0'}`}>
                                    <MdOutlineArrowForwardIos className={`text-base md:text-lg lg:text-xl transition-colors duration-300 ${hoveredCategory === index
                                            ? 'text-primary'
                                            : 'text-gray-400'
                                        }`} />
                                </div>
                            </button>

                            {/* Subcategories */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openCategory === index ? 'max-h-[300px] md:max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="ml-2 md:ml-4 lg:ml-6 mt-1 md:mt-2 space-y-1 md:space-y-2">
                                    {category.subCategories?.map((item, subIndex) => (
                                        <Link
                                            key={item._id}
                                            to={`/${category._id}/${item._id}`}
                                            className="block py-1.5 md:py-2 lg:py-3 px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-300 group/sub"
                                        >
                                            <div className="flex line-clamp-1 items-center gap-2 md:gap-3">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
                                                <span className="text-gray-600 line-clamp-1 group-hover/sub:text-primary transition-colors duration-300 text-xs md:text-sm lg:text-base">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-4 md:mt-6 lg:mt-8 pt-3 md:pt-4 lg:pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-gray-500 text-xs md:text-sm lg:text-base">
                        <div className="flex items-center gap-1 md:gap-2">
                            <FaStarIcon className="text-yellow-400" />
                            <span className="hidden md:block">Premium</span>
                            <span className="md:hidden">Pro</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>
                </div>

                {/* Floating notification */}
                <div className="absolute top-3 md:top-4 lg:top-6 right-3 md:right-4 lg:right-6 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs font-bold">{categories?.length || 0}</span>
                </div>
            </div>
        </div>
    )
}

const HeroSection = () => {
    const banners = [
        {
            image: 'https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753293898/WhatsApp_Image_2025-07-23_at_17.53.20_g1ay92.jpg',
            title: "Bihar ki Sanskriti, Aapke Ghar Tak",
            subtitle: "Discover Authentic Bihari Essence",
            description: "Explore Mithila’s rich heritage—handpicked delicacies, handicrafts & more straight from Bihar",
            cta: "Shop Now",
            badge: "New Arrival"
        },
        {
            image: 'https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753293898/WhatsApp_Image_2025-07-23_at_17.53.20_1_qixpmy.jpg',
            title: "Taste of Tradition",
            subtitle: "Swaad Jo Yaad Rahe",
            description: "From Thekua to Litti-Chokha – relish Bihar’s most iconic flavors crafted with love and purity",
            cta: "Explore Foods",
            badge: "Best Seller"
        },
        {
            image: 'https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753293898/WhatsApp_Image_2025-07-23_at_17.53.21_vsuaak.jpg',
            title: "Mithila Art Magic",
            subtitle: "Paintings That Speak",
            description: "Adorn your home with vibrant Mithila paintings made by skilled rural artists",
            cta: "View Collection",
            badge: "Handmade"
        },
        {
            image: 'https://res.cloudinary.com/dmao0koo4/image/upload/q_auto/v1753293898/WhatsApp_Image_2025-07-23_at_17.53.21_1_qoqbfm.jpg',
            title: "Cultural Gifting",
            subtitle: "Gifts with a Story",
            description: "Surprise your loved ones with culturally rooted Bihari gift hampers & festive bundles",
            cta: "Send a Gift",
            badge: "Limited Edition"
        }
    ];

    const navigate = useNavigate()
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length, isPlaying]);

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 flex flex-col-reverse lg:flex-row justify-between py-4 md:py-6 lg:py-8 relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 md:top-20 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-primary/10 to-pink-500/10 rounded-full blur-2xl md:blur-3xl animate-float"></div>
                <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-28 h-28 md:w-40 md:h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl md:blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-60 md:h-60 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-full blur-2xl md:blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <Sidebar />

            <div className="w-full lg:w-4/6 xl:w-4/5 2xl:w-5/6 rounded-xl md:rounded-2xl md:pl-6 lg:pl-8 xl:pl-10 md:pt-4 lg:pt-6 xl:pt-8 p-2 md:p-4 relative">
                <div className="w-full relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-xl lg:shadow-2xl">
                    {/* Main Carousel */}
                    <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] 2xl:h-[650px] flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
                        {banners.map((banner, index) => (
                            <div
                                key={index}
                                className="w-full h-full bg-cover bg-center flex-shrink-0 relative"
                                style={{ backgroundImage: `url(${banner.image})` }}
                            >
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center p-4 md:p-6 lg:p-8 xl:p-12">
                                    <div className="max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-xl">
                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-primary text-white px-2.5 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-3 lg:mb-4 animate-fade-in-up">
                                            <FaStar className="text-yellow-300" />
                                            {banner.badge}
                                        </div>

                                        {/* Subtitle */}
                                        <p className="text-primary font-semibold text-sm md:text-base lg:text-lg mb-1 md:mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                            {banner.subtitle}
                                        </p>

                                        {/* Title */}
                                        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 md:mb-3 lg:mb-4 leading-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                            {banner.title}
                                        </h1>

                                        {/* Description */}
                                        <p className="text-white/90 text-xs md:text-sm lg:text-base xl:text-lg mb-3 md:mb-4 lg:mb-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                            {banner.description}
                                        </p>

                                        {/* CTA Button */}
                                        <button onClick={()=> navigate('/product')} className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-6 xl:py-4 xl:px-8 rounded-full text-xs md:text-sm lg:text-base xl:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up flex items-center gap-1.5 md:gap-2" style={{ animationDelay: '0.8s' }}>
                                            {banner.cta}
                                            <FaPlay className="text-xs md:text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        className="absolute left-1 md:left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-white/20"
                        onClick={prevBanner}
                    >
                        <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-1 md:right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-white/20"
                        onClick={nextBanner}
                    >
                        <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Play/Pause Button */}
                    <button
                        className="absolute top-1 md:top-2 lg:top-4 right-1 md:right-2 lg:right-4 bg-white/20 backdrop-blur-md text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? (
                            <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <FaPlay className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        )}
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 md:bottom-3 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 md:space-x-2 lg:space-x-3">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentBanner(index)}
                                className={`w-1.5 h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${currentBanner === index
                                        ? 'bg-white scale-125 shadow-lg'
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                            ></button>
                        ))}
                    </div>

                    {/* Floating Stats */}
                    {/* <div className="absolute top-2 md:top-3 lg:top-6 left-2 md:left-3 lg:left-6 bg-white/20 backdrop-blur-md p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl border border-white/20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        <div className="text-white text-center">
                            <div className="text-sm md:text-lg lg:text-2xl font-bold">50K+</div>
                            <div className="text-xs md:text-xs lg:text-sm opacity-80">Happy Customers</div>
                        </div>
                    </div> */}

                    <div className="absolute bottom-2 md:bottom-3 lg:bottom-6 right-2 md:right-3 lg:right-6 bg-white/20 backdrop-blur-md p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl border border-white/20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                        <div className="text-white text-center">
                            <div className="text-sm md:text-lg lg:text-2xl font-bold">24/7</div>
                            <div className="text-xs md:text-xs lg:text-sm opacity-80">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;