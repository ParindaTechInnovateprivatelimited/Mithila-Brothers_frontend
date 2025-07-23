import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../../../../redux/slices/cartSlice';

const CartItem = ({ item, quantityInputs, handleQuantityChange, handleRemoveItem, updatingItemId, index }) => {
    const dispatch = useDispatch();

    const [, setItemPrice] = useState(item.product.price);


    useEffect(() => {
        // Update itemPrice when discountPrice is available
        if (item.offer && Array.isArray(item.offer) && item.offer[0]?.discountPrice !== null) {
            setItemPrice(item.offer[0]?.discountPrice || item.product.price);
        } else {
            setItemPrice(item.product.price);
        }
    }, [item.offer, item.product.price]);

    // const totalPrice = itemPrice * (quantityInputs[item.id] || item.quantity);


    const handleRemove = async (itemId) => {
        await handleRemoveItem(itemId);
        dispatch(fetchCartItems())
    };


    return (

        <li
            key={item._id}
            className={`flex flex-col sm:flex-row px-2 sm:px-5 sm:items-center shadow-gray-100 shadow-md drop-shadow-sm  sm:py-3 my-5 font-Poppins bg-white ${updatingItemId === item.id ? 'opacity-50' : ''
                }`}
        >
            <div className="sm:w-1/4 flex gap-4 sm:gap-0 sm:flex-row items-start h-24  sm:h-auto justify-between  mb-3 sm:mb-0">
                <div className="w-24 h-24 sm:w-16 sm:h-16">
                    <img
                        src={item.product?.image || 'default-image-path.jpg'}
                        alt={item.product.productName}
                        className="object-cover w-24 h-24 sm:w-16 sm:h-16  rounded"
                    />
                </div>

                <div className="w-full h-24 sm:h-auto flex flex-col justify-between sm:justify-start ml-0 sm:ml-4">
                    <div className="flex h-1/2 justify-between items-center sm:block">
                        <div className="text-sm sm:text-base m-1 line-clamp-2">
                            {item.product.productName}
                        </div>
                        <div >
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="text-white bg-red-600  h-6 w-6 flex items-center justify-center rounded-full hover:bg-red-700 sm:hidden"
                            >
                                &#x2717;
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between sm:hidden ">
                        <div className="text-sm sm:hidden mt-1">
                            &#8377;{item.totalPrice.toFixed(2)}
                        </div>
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                                onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                                disabled={updatingItemId === item.id}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantityInputs[item._id] || item.quantity}
                                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                className="w-12 text-center text-sm sm:text-base outline-none"
                                disabled={updatingItemId === item.id}
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                disabled={updatingItemId === item.id}
                            >
                                +
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full sm:w-1/4  text-center  text-sm sm:text-base my-auto hidden sm:block">
                &#8377;{item.product.price.toFixed(2)}
            </div>

            <div className="w-full sm:w-1/4  items-center justify-center  text-center my-2 sm:my-0 hidden sm:flex">
                <input
                    type="number"
                    min="1"
                    value={quantityInputs[item._id] || item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    className="p-1 w-16 border rounded border-black no-spinner text-center text-sm sm:text-base outline-none"
                    disabled={updatingItemId === item.id}
                />
            </div>

            <div className="w-full sm:w-1/4 flex items-center justify-between sm:justify-center sm:gap-x-4 text-center ">
                <div className="hidden sm:block">
                    &#8377;{item.totalPrice.toFixed(2)}
                </div>

                <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-2 sm:ml-0 text-white bg-red-600 h-6 w-6 font-Inter  items-center justify-center rounded-full hover:bg-red-700 hidden sm:flex"
                >
                    &#x2717;
                </button>
            </div>
        </li>

    );
};

export default CartItem;
