import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../product/component/ProductCard';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlistItems, loading, error } = useSelector((state) => state.wishlist);

    if (loading) return <div className='text-center font-TenorSans'>Loading...</div>;
    if (error) return <div className='text-center font-TenorSans'>Error: {error}</div>;

    // Check if the wishlist is empty
    if (wishlistItems.length === 0) {
        return <p className="text-center font-TenorSans py-48">Your wishlist is empty.</p>;
    }

    // Render the wishlist items if they are available
    return (
        <div className='font-Poppins xl:px-[135px] lg:px-[100px] md:px-[60px] mb-[70px] px-[14px] lg:mb-[140px]'>
            <div>
                <div className='mb-[20px] lg:mb-[60px] mt-[40px] lg:mt-[80px] flex align-middle justify-between  h-[48px]'>
                    <h2 className="text-xl font-normal  my-auto leading-relaxed font-Poppins">
                        WishList ({wishlistItems.length})
                    </h2>
                    <button

                        className='bg-transparent  border border-black rounded py-[10px] px-[15px] sm:px-[30px] text-sm font-normal font-Poppins focus:bg-primary focus:border-none focus:text-white focus:border-primary'
                    >
                        Move All To Bag
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 border-black mx-auto py-4">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="mb-10 sm:mb-5 w-auto mx-auto">
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className='lg:mb-[60px] mb-[20px] mt-[40px] lg:mt-[80px] flex align-middle justify-between  h-[48px]'>
                    <div className='flex gap-4'>
                        <div className="w-5 h-10 relative">
                            <div className="w-5 h-10 left-0 top-0 absolute bg-primary rounded" />
                        </div>
                        <h2 className="text-xl font-normal py-1 leading-relaxed font-Poppins">
                            Just For You
                        </h2>
                    </div>
                    <button
                    onClick={(()=> navigate('/product'))}
                        className='bg-transparent border border-black rounded py-[10px] px-[30px] text-sm font-normal font-Poppins focus:bg-primary focus:border-none focus:text-white focus:border-primary'
                    >
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 border-black mx-auto py-4">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="mb-10 sm:mb-5 w-auto mx-auto">
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
