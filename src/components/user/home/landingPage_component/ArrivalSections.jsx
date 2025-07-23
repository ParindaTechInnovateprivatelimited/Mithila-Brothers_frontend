import React from 'react';
import ProductCard, { LandingProductCardSkeleton } from './ProductCard';
import { useSelector } from 'react-redux';

const ArrivalCards = () => {
    const product1 = useSelector((state) => state.products?.newarrivals?.data[0]);
    const product2 = useSelector((state) => state.products?.newarrivals?.data[1]);
    const product3 = useSelector((state) => state.products?.newarrivals?.data[2]);
    const product4 = useSelector((state) => state.products?.newarrivals?.data[3]);
    const isLoading = useSelector((state) => state.products?.newarrivals?.isLoading);
    
    // Check if we have any products loaded
    const hasProducts = product1 || product2 || product3 || product4;
    
    return (
        <div className="w-full h-full flex flex-col lg:flex-row gap-6">
            {/* Main Large Card */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px]">
                {isLoading || !product1 ? (
                    <LandingProductCardSkeleton />
                ) : (
                    <ProductCard
                        image={product1?.images[0].url}
                        title={product1?.productName}
                        description={product1?.description}
                        Link={`/${product1?.categoryId}/${product1?.subCategoryId}/${product1?._id}`}
                    />
                )}
            </div>
            
            {/* Right Side Grid */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                {/* Top Card */}
                <div className="h-[240px] lg:h-[240px]">
                    {isLoading || !product2 ? (
                        <LandingProductCardSkeleton />
                    ) : (
                        <ProductCard
                            image={product2?.images[0].url}
                            title={product2?.productName}
                            description={product2?.description}
                            Link={`/${product2?.categoryId}/${product2?.subCategoryId}/${product2?._id}`}
                        />
                    )}
                </div>
                
                {/* Bottom Two Cards */}
                <div className='flex gap-6'>
                    <div className="h-[240px] w-1/2">
                        {isLoading || !product3 ? (
                            <LandingProductCardSkeleton />
                        ) : (
                            <ProductCard
                                image={product3?.images[0].url}
                                title={product3?.productName}
                                description={product3?.description}
                                Link={`/${product3?.categoryId}/${product3?.subCategoryId}/${product3?._id}`}
                            />
                        )}
                    </div>
                    <div className="h-[240px] w-1/2">
                        {isLoading || !product4 ? (
                            <LandingProductCardSkeleton />
                        ) : (
                            <ProductCard
                                image={product4?.images[0].url}
                                title={product4?.productName}
                                description={product4?.description}
                                Link={`/${product4?.categoryId}/${product4?.subCategoryId}/${product4?._id}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrivalCards;

