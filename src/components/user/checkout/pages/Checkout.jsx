import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BillingDetails from '../component/BillingDetails';
import OrderSummary from '../component/OrderSummary';
import Breadcrumbs from '../../../../shared/Breadcrumbs'
import Modals from '../../../../shared/Modal';


import { fetchCartForOrder, placeOrder } from '../../../../redux/slices/orderSlice';

import toast from 'react-hot-toast';
// import serverUrl from '../../../../config/serverUrl';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../../../../redux/slices/cartSlice';
import { getOrderById, initiatePayUPayment } from '../../../../services/orderService';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const orderData = useSelector((state) => state.orders);

    const [billingInfo, setBillingInfo] = useState(null);
    const [payuData, setPayuData] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (payuData) {
            setOpen(true);
        }
    }, [payuData]);


    const handleClose = () => {
        setOpen(false);
    };


    const createOrder = async (orderSummary) => {
        try {
            setLoading(true);
            const response = await dispatch(placeOrder(orderSummary)).unwrap();
            // setOrderId(response.payload.orderId.id);
            setLoading(false);
            return response;
        } catch (error) {
            console.error("Error creating order:", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        dispatch(fetchCartForOrder());
    }, [dispatch]);

    const handleProceed = (billingInfo) => {
        setBillingInfo(billingInfo);
    };


    const handlePlaceOrder = async (method) => {
        if (billingInfo) {
            const orderSummary = {
                ...orderData,
                shippingAddress: billingInfo._id,
                paymentMethod: method
            };
            setLoading(true);
            try {
                const response = await createOrder(orderSummary);
                const data = await getOrderById(response.data.id);
                if (data && data._id) {
                    setOrderId(data._id)
                    setUserId(data.userId)
                    if (method === 'Prepaid') {
                        const payData = await initiatePayUPayment(data);
                        setPayuData(payData);
                    } else {
                        dispatch(fetchCartItems())
                        // navigate('/my-account/orders');
                        toast.success(response.message)
                    }
                } else {
                    console.error("Order ID not received");
                    toast.error("Failed to create order. Please try again.");
                }
            } catch (error) {
                console.error("Error creating order:", error);
                toast.error("An error occurred while placing the order.");
            } finally {
                dispatch(fetchCartItems())
                // navigate('/my-account/orders');
                setLoading(false);
            }
        } else {
            toast.error("Please select an address!");
        }
    };

    useEffect(() => {
        dispatch(fetchCartForOrder());
        if (cartItems.items.length === 0) {
            navigate('/product');
        }
    }, [dispatch, cartItems.items.length, navigate]);

    return (
        <>
            <div className='xl:px-[135px] lg:px-[100px] md:px-[60px] mb-[70px] sm:mb-[140px] px-[20px]'>
                <div className="sm:my-[80px] my-[40px]">
                    <Breadcrumbs />
                </div>
                <h2 className="sm:text-4xl text-2xl leading-[30px] font-Inter tracking-wider mb-[48px] sm:mb-[48px]">Billing Details</h2>
                <div className="checkout-page font-TenorSans  gap-4 lg:flex w-full border-black md:justify-between ">
                    <div className="left-side  border-black">
                        <BillingDetails
                            onProceed={handleProceed}
                        />
                    </div>
                    <div className="right-side sm:min-w-[350px] xl:min-w-[460px] lg:min-w-[400px] border-black">
                        <OrderSummary
                            cartItems={cartItems.items}
                            subtotal={cartItems.subtotal}
                            shipping={cartItems.shippingCharges}
                            total={cartItems.total}
                            billingInfo={billingInfo}
                            onPlaceOrder={handlePlaceOrder}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            {payuData && (
                <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose}  contentLabel="Pay Now">
                    <h1 className='text-center text-2xl mb-20  font-bold'>Click to Pay Now</h1>
                    <form method="POST" action={payuData.url} className='text-center'>
                        <input type="hidden" name="key" value={payuData.paymentData.key} />
                        <input type="hidden" name="txnid" value={payuData.paymentData.txnId} />
                        <input type="hidden" name="amount" value={payuData.paymentData.totalAmount} />
                        <input type="hidden" name="productinfo" value={payuData.paymentData.productinfo} />
                        <input type="hidden" name="firstname" value={payuData.paymentData.firstname} />
                        <input type="hidden" name="lastname" value={payuData.paymentData.lastname} />
                        <input type="hidden" name="address1" value={payuData.paymentData.address1} />
                        <input type="hidden" name="address2" value={payuData.paymentData.address2} />
                        <input type="hidden" name="city" value={payuData.paymentData.city} />
                        <input type="hidden" name="state" value={payuData.paymentData.state} />
                        <input type="hidden" name="country" value={payuData.paymentData.country} />
                        <input type="hidden" name="zipcode" value={payuData.paymentData.zipcode} />
                        <input type="hidden" name="email" value={payuData.paymentData.email} />
                        <input type="hidden" name="phone" value={payuData.paymentData.phone} />
                        <input type="hidden" name="surl" value={payuData.paymentData.surl} />
                        <input type="hidden" name="furl" value={payuData.paymentData.furl} />
                        <input type="hidden" name="hash" value={payuData.paymentData.hash} />
                        <input type="hidden" name="udf1" value={orderId} />
                        <input type="hidden" name="udf2" value={userId} />
                        <button type="submit" className='bg-primary text-white py-[16px] px-[48px] text-base font-normal rounded mb-4 w-full sm:w-auto'>Pay Now</button>
                    </form>
                </Modals>
            )}
        </>
    );
};

export default Checkout;
