import React from 'react';
import { Link } from 'react-router-dom';

// Skeleton Loader for Landing Page Product Card
const LandingProductCardSkeleton = () => {
    return (
        <div className="group relative w-full h-full bg-gray-200 rounded-xl overflow-hidden shadow-lg animate-pulse mx-auto">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            
            {/* Content skeleton */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="space-y-3">
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    {/* Description skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    {/* Button skeleton */}
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ image, title, description, Link: productLink }) => {
    return (
        <div className="group relative w-full h-full bg-cover bg-center rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mx-auto">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <div 
                        className="text-sm mb-4 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                        dangerouslySetInnerHTML={{ __html: description }} 
                    />
                    
                    {/* Shop Now Button */}
                    <Link 
                        to={productLink} 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors duration-300 group/btn"
                    >
                        <span className="border-b border-white group-hover/btn:border-primary transition-colors duration-300">
                            Shop Now
                        </span>
                        <svg 
                            className="w-4 h-4 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
            
            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors duration-300"></div>
        </div>
    );
};

export { LandingProductCardSkeleton };
export default ProductCard;