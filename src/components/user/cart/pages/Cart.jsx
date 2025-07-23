import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../../shared/Breadcrumbs';
import { useCartHandlers } from '../../../../hooks/useCartHandler';
import CartItem from '../component/CartItem';
import CartTotal from '../component/CartTotal';
import { fetchCartItems } from '../../../../redux/slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantityInputs, setQuantityInputs] = useState({});

    const cartItems = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const { handleQuantityChange, handleRemoveItem, updatingItemId } = useCartHandlers(dispatch);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    if (cartItems.loading) {
        return (
            <div className="relative">
                <div className="loading-overlay">
                    <div className="text-white font-TenorSans text-xl">Loading your cart...</div>
                </div>
                <div className="py-10 xl:px-[135px]  lg:px-[100px] md:px-[60px] px-[20px]">
                    <div className='m sm:my-[80px]'>
                        <Breadcrumbs />
                    </div>
                    <div className='mb-5 font-Poppins'>
                        <div className="flex flex-col sm:flex-row justify-center py-5 bg-white">
                            <div className="w-full sm:w-1/4 text-center skeleton-box mb-4 sm:mb-0">Product</div>
                            <div className="w-full sm:w-1/4 text-center skeleton-box mb-4 sm:mb-0">Price</div>
                            <div className="w-full sm:w-1/4 text-center skeleton-box mb-4 sm:mb-0">Quantity</div>
                            <div className="w-full sm:w-1/4 text-center skeleton-box">Subtotal</div>
                        </div>
                        <ul className="mb-4">
                            {[...Array(3)].map((_, index) => (
                                <li key={index} className="flex flex-col sm:flex-row justify-between py-5">
                                    <div className="w-full sm:w-1/4 skeleton-box mb-4 sm:mb-0" style={{ height: '50px' }}></div>
                                    <div className="w-full sm:w-1/4 skeleton-box mb-4 sm:mb-0" style={{ height: '50px' }}></div>
                                    <div className="w-full sm:w-1/4 skeleton-box mb-4 sm:mb-0" style={{ height: '50px' }}></div>
                                    <div className="w-full sm:w-1/4 skeleton-box" style={{ height: '50px' }}></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <p className='font-TenorSans text-center py-48 px-4'>Please login first to see your Cart</p>;
    }

    if (cartItems.items.length === 0) {
        return (
            <div className="py-10 xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]">
                <div className='m sm:my-[80px]'>
                    <Breadcrumbs />
                </div>
                <div className="text-center text-lg mb-48 font-TenorSans">
                    No cart items. Please add to cart first.
                </div>
            </div>
        );
    }

    return (
        <div className="mb-[70px] sm:mb-[140px] xl:px-[135px]  lg:px-[100px] md:px-[60px] px-[20px]">
            <div className='m sm:my-[80px]'>
                <Breadcrumbs />
            </div>
            <div className='mb-5 font-Poppins'>
                <div className="flex shadow-gray-100 shadow-md drop-shadow-sm  flex-nowrap justify-center py-5 bg-white">
                    <div className="w-full sm:w-1/4 text-center text-xs sm:text-base">Product</div>
                    <div className="w-full sm:w-1/4 text-center text-xs sm:text-base">Price</div>
                    <div className="w-full sm:w-1/4 text-center text-xs sm:text-base">Quantity</div>
                    <div className="w-full sm:w-1/4 text-center text-xs sm:text-base">Subtotal</div>
                </div>
                <ul className="mb-4">
                    {cartItems.items.map((item, index) => (
                        <CartItem
                            index={index}
                            key={item._id}
                            item={item}
                            quantityInputs={quantityInputs}
                            handleQuantityChange={(id, value) => handleQuantityChange(id, value, setQuantityInputs)}
                            handleRemoveItem={handleRemoveItem}
                            updatingItemId={updatingItemId}
                        />
                    ))}
                </ul>
            </div>

            <div className="text-center flex justify-between sm:text-left">
                <button
                    onClick={() => navigate('/')}
                    className='bg-transparent border border-black rounded py-[10px] px-[20px] sm:px-[30px] text-sm sm:text-md font-Poppins focus:bg-primary focus:border-none focus:text-white focus:border-primary'
                >
                    Return To Shop
                </button>
                <button
                    onClick={() => navigate('/')}
                    className='bg-transparent border border-black rounded py-[10px] px-[20px] sm:px-[30px] text-sm sm:text-md font-Poppins focus:bg-primary focus:border-none focus:text-white focus:border-primary'
                >
                    Update Cart
                </button>
            </div>

            <CartTotal
                subtotal={cartItems.subtotal}
                shippingCharge={cartItems.shippingCharges}
                total={cartItems.total}
                navigate={navigate}
            />
        </div>
    );
};

export default Cart;




// useEffect(() => {
//     if (user) {
//         const fetchCart = async () => {
//             try {
//                 const items = await getCartItems();
//                 items.data.items.forEach(item => dispatch(addItem(item)));
//             } catch (error) {
//                 console.error("Error fetching cart items:", error);
//             }
//         };

//         fetchCart();
//     }
// }, [user, dispatch]);
