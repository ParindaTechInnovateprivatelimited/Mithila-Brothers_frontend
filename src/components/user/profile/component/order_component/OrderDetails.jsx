import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrdersById } from '../../../../../redux/slices/orderSlice';

// const demoOrder = {
//     id: "12345",
//     status: "Shipped",
//     totalPrice: 123.45,
//     createdAt: "2024-08-01T12:34:56Z",
//     address: {
//         firstName: "John",
//         lastName: "Doe",
//         addressLine1: "123 Main Street",
//         addressLine2: "Apt 4B",
//         city: "New York",
//         state: "NY",
//         country: "USA",
//         pincode: "10001",
//         mobileNumber: "1234567890",
//         email: "john.doe@example.com"
//     },
//     payment: {
//         method: "Credit Card",
//         shippingCharges: 10.00,
//         subtotal: 111.45,
//         discount: 5.00,
//         discountPercentage: ((5.00 / 111.45) * 100).toFixed(2),
//         gst: 2.00,
//         total: (111.45 - 5.00 + 10.00 + 2.00).toFixed(2)
//     },
//     items: [
//         {
//             id: "item1",
//             productName: "Product 1",
//             price: 45.00,
//             color: 'red',
//             size: 32,
//             quantity: 2,
//             photo: "https://via.placeholder.com/100"
//         },
//         {
//             id: "item2",
//             productName: "Product 2",
//             price: 33.45,
//             color: 'space gray',
//             size: 32,
//             quantity: 1,
//             photo: "https://via.placeholder.com/100"
//         },
//         {
//             id: "item3",
//             productName: "Product 3",
//             price: 33.45,
//             color: 'space gray',
//             size: 32,
//             quantity: 1,
//             photo: "https://via.placeholder.com/100"
//         }
//     ]
// };



const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(date);

    const [month, day, year] = formattedDate.replace(',', '').split(' ');

    return `${month} ${day}, ${year}`;
};



const OrderDetailsPage = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.orders.getOrdersByIdStatus);
    const orders = useSelector((state) => state.orders?.getOrdersById);
    // const data = useSelector((state) => state.orders);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getOrdersById(id));
    }, [dispatch, id]);

    const order = orders;

    function capitalize(status) {
        return status
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    if (status === 'loading') {
        return <div className="loading-overlay">
        <div className="text-white font-TenorSans text-xl">Loading...</div>
      </div>;
    }

    if (status === 'failed') {
        return <div className='text-center text-sm font-Poppins'>Failed to load order details. Please try again.</div>;
    }

    if (status === 'succeeded') {
        return (
            <div className="w-full sm:py-5 py-2 px-2 sm:px-5 bg-white shadow-xl rounded-lg font-Inter">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-me text-primary mb-1 border-primary">Order ID: <span className="text-[#130f26]/80">{id.toUpperCase()}</span></h1>
                <div className='flex border-b border-gray-300 pb-3 lg:gap-4 gap-2 text-[8px] sm:text-[10px] lg:text-sm'>
                    <p className='text-[#78756e] '>Order Date: <span className='text-black '>{formatDate(order.createdAt)}</span></p>
                    <p className='text-[#78756e]'>|</p>
                    <p className='text-green-500 '>Estimated Delivery: 12 Aug, 2024</p>
                    <p className='text-[#78756e]'>|</p>
                    <p className="text-[#78756e]">{order.status}</p>
                </div>
                {/* <h3 className="text-2xl font-semibold mb-2 text-[#754f23] mt-3">Items:</h3> */}
                <ul className="space-y-4  mt-3 mb-3">
                    {order.items.map((item) => (
                        <li key={item._id} className="flex items-start space-x-4 border-b border-[#dcdcdc] pb-4">
                            <img src={item.productId.images[0].url} alt={item.productId.productName} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                            <div className='flex justify-between w-full my-auto'>
                                <div className='text-[#78756e]'>
                                    <p className="text-md sm:text-xl line-clamp-1 text-[#130f26]/90 font-normal mb-0.5">{item.productId.productName}</p>
                                    <p className='text-sm'>{capitalize(item.productId.color.name)} | {item.size}</p>
                                </div>
                                <div>
                                    <p className="text-md sm:text-xl text-[#78756e] mb-0.5"><span className="font-medium text-[#130f26]">₹{item.finalPrice}</span></p>
                                    <p className="text-sm text-[#78756e] text-right">Qty: <span className="font-medium text-[#78756e]">{item.quantity}</span></p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="bg-white  border-b border-gray-300 pb-3">
                    {/* <h2 className="text-2xl font-semibold text-[#754f23] mb-2"> <span className="text-[#130f26]">{order.id}</span></h2> */}
                    <div className='flex w-full'>
                        <div className='text-start w-1/2'>
                            <h1>Payment</h1>
                            <p className='mt-2 text-xs sm:text-sm text-gray-500'>
                                Mode : {order.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Bank'}
                            </p>
                            <p className='text-xs sm:text-sm text-gray-500'>
                                Txn ID : {order?.transactionId}
                            </p>
                        </div>
                        <div className='text-left w-1/2'>
                            <h1>Delivery</h1>
                            <div>
                                <h3 className='text-sm text-gray-400 mt-2'>Address</h3>
                                <p className='text-gray-600 font-semibold'>{order.shippingAddress.firstName} {order.shippingAddress.lastName},</p>
                                <div className='text-gray-500'>
                                    <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
                                    <p>+{order.shippingAddress.phone}</p>
                                    <p className='text-xs sm:text-sm'>{order.shippingAddress.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <p className="text-lg text-[#78756e] mb-1">Status: <span className="font-medium text-[#130f26]">{order.status}</span></p>
                <p className="text-lg text-[#78756e] mb-1">Total Price: <span className="font-medium text-[#130f26]">₹{order.totalPrice.toFixed(2)}</span></p>
                <p className="text-lg text-[#78756e]">Order Date: <span className="font-medium text-[#130f26]">{formatDate(order.createdAt)}</span></p> */}
                </div>
                <div className="bg-white mt-3">
                    <div className='flex w-full'>
                        <div className='text-start w-1/2'>
                            <h1>Need Help?</h1>
                            <div className='text-[14px]'>
                                <p className='mt-2 text-gray-500'>Cancel?</p>
                                <p className='text-gray-500'>Order Info?</p>
                                <p className='text-gray-500'>Returns?</p>
                            </div>
                        </div>
                        <div className='text-left w-1/2 '>
                            <h1>Order Summary</h1>
                            <div className='flex justify-between border-b pb-2 border-dashed border-gray-300'>
                                <div>
                                    <p className='mt-2 text-gray-600 font-semibold'>Subtotal</p>
                                    <div className='text-xs text-gray-400 space-y-1'>
                                        <p>Discount</p>
                                        <p>Delivery</p>
                                        <p>GST</p>
                                    </div>
                                </div>
                                <div className='text-gray-400 text-end '>
                                    <p className=' mt-2 text-gray-600 font-semibold'>₹{order.subtotalAmount}</p>
                                    <div className='text-xs space-y-1'>
                                        <p>({order?.discountPercentage || 0}%) - ₹{order?.discount || 0}</p>
                                        <p>₹{order.shippingCharge}</p>
                                        <p>0 %</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-3 justify-between'>
                                <p>Total</p>
                                <p>₹{order.totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default OrderDetailsPage;
