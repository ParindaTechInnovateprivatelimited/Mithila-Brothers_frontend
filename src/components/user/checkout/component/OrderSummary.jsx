import React, { useState } from 'react';
import { ReactComponent as Paytm } from '../../../../assets/icons/paytm.svg'
import { ReactComponent as Upi } from '../../../../assets/icons/phonepe.svg'
import { ReactComponent as PhonePe } from '../../../../assets/icons/upi.svg'
import { ReactComponent as GooglePay } from '../../../../assets/icons/google-pay.svg';
import toast from 'react-hot-toast';



const OrderSummary = ({ cartItems, subtotal, shipping, total, onPlaceOrder, loading }) => {
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handlePayment = async () => {
        if (!selectedOption) {
            toast.error("Please Select Payment Option");
            return;
        }
        onPlaceOrder(selectedOption);
    };
    
    return (
        <div className="order-summary mt-12 mx-auto lg:mx-0 rounded-md  max-w-md lg:max-w-[527px] lg xl:w-[527px] ">
            {/* <h2 className="text-xl font-semibold mb-4">Order Summary</h2> */}
            <div className="xl:w-[422px]">
                <ul className="mb-8 space-y-4">
                    {cartItems.map((item) => (
                        <li key={item._id} className="flex justify-between gap-4">
                            <div className="flex gap-4 line-clamp-1 ">
                                <img src={item.product.image} alt={item.product.productName} className='h-16 w-14' />
                                <span > {item.product.productName} x {item.quantity}</span>
                            </div>
                            <span>₹{item.totalPrice}</span>
                        </li>
                    ))}
                </ul>

                <div className="mb-4">
                    <p className="flex justify-between border-b border-black py-3"><span>Subtotal:</span> <span>₹{subtotal}</span></p>
                    <p className="flex justify-between border-b border-black py-3"><span>Shipping:</span> <span>₹{shipping}</span></p>
                    <p className="flex justify-between py-3"><span>Total:</span> <span>₹{total}</span></p>
                </div>

                <div className="mb-6">
                    <div className="flex flex-col gap-2">
                        {/* Bank Radio Button */}
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                
                                value="Prepaid"
                                checked={selectedOption === 'Prepaid'}
                                onChange={handleOptionChange}
                                className="form-radio h-4 w-4 accent-primary text-red-600 "
                            />
                            <div className='w-full flex h-full justify-between'>
                                <span>Bank</span>
                                <div className='flex gap-2 h-full'>
                                    <PhonePe className=" sm:h-6 h-5" alt="PhonePe" />
                                    <GooglePay className=" sm:h-6 h-5" alt="Google Pay" />
                                    <Upi className=" sm:h-6 h-5" alt="UPI" />
                                    <Paytm className="h-5 sm:h-6 object-cover" alt="Paytm" />
                                </div>
                            </div>
                        </label>

                        {/* Cash On Delivery Radio Button */}
                        <label className="flex  text-gray-500 items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="COD"
                                disabled
                                checked={selectedOption === 'COD'}
                                onChange={handleOptionChange}
                                className="form-radio h-4 w-4 accent-primary text-red-600"
                            />
                            <span>Cash On Delivery (Unavailable)</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className=" xl:w-[527px] font-TenorSans mb-10">
                <form action="" className="space-y-4 md:space-y-0 flex flex-col md:flex-row md:justify-between items-center">
                    <input
                        type="text"
                        name="couponCode"
                        id="couponCode"
                        placeholder="Coupon Code"
                        className="border py-[16px] xl:py-[16px] sm:py-[13px] lg:py-[12px] w-full  px-4 sm:w-[300px] xl:w-[300px] outline-none  md:w-auto border-black bg-transparent"
                    />
                    <button
                        className="py-[16px] sm:px-[48px] lg:text-sm  xl:text-base font-normal rounded text-white bg-primary w-full md:w-auto"
                    >
                        Apply Coupon
                    </button>
                </form>
            </div>
            <button onClick={handlePayment} className="bg-primary text-white py-[16px] px-[48px] text-base font-normal rounded mb-4 w-full sm:w-auto"
            >
                {loading ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
};

export default OrderSummary;
