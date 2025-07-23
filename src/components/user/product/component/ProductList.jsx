import React, { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { fetchCategory } from '../../../../redux/slices/productSlice';

const ProductList = forwardRef(({ category }, ref) => {
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.products['trending']);
    const { data, isLoading, error } = categoryState || {};

    useEffect(() => {
        dispatch(fetchCategory(category));
    }, [dispatch, category]);

    // Generate skeleton cards for loading state
    const renderSkeletonCards = (count = 8) => {
        return Array.from({ length: count }, (_, index) => (
            <div key={index} className="flex justify-center">
                <ProductCardSkeleton />
            </div>
        ));
    };

    // Generate skeleton cards for grid layout
    const renderGridSkeletonCards = (count = 8) => {
        return Array.from({ length: count }, (_, index) => (
            <div key={index} className="flex justify-center">
                <ProductCardSkeleton />
            </div>
        ));
    };

    return (
        <div className="mx-auto">
            {isLoading ? (
                <>
                    {category === 'trending' ? (
                        <div className="relative block">
                            <div
                                className="flex overflow-x-auto no-scrollbar space-x-[30px] p-2 justify-center"
                                ref={ref}
                            >
                                {renderSkeletonCards(6)}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
                            {renderGridSkeletonCards(8)}
                        </div>
                    )}
                </>
            ) : error ? (
                <div className="text-center py-10">
                    <div className="text-primary font-semibold mb-2">Error loading products</div>
                    <div className="text-gray-600">{error}</div>
                </div>
            ) : (
                <>
                    {category === 'trending' ? (
                        <>
                            <div className="relative w-full">
                                <div
                                    className="flex overflow-x-auto no-scrollbar space-x-[30px] p-2 justify-center"
                                    ref={ref}
                                >
                                    {data && data.map((product) => (
                                        <div key={product._id} className="flex justify-center">
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
                            {data && data.length > 0 ? (
                                data.map((product) => (
                                    <div key={product._id} className="flex justify-center">
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 col-span-full font-TenorSans">No Products Available Please Check Your Internet Connection!</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
});

export default ProductList;