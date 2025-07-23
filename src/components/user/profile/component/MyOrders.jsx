import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../../redux/slices/orderSlice';


const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
};

const MyOrders = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const orders = useSelector((state) => state.orders.getOrders);

    useEffect(() => {
        setLoading(true)
        dispatch(getOrders());
        setLoading(false)
    }, [dispatch]);

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="text-white font-Inter text-xl">Loading...</div>
                </div>
            )}
            <div className={`${loading ? 'opacity-50' : ''} p-2 sm:p-5`}>
                <div className='bg-white w-full h-[480px] no-scrollbar overflow-scroll py-[40px] font-Poppins'>
                    <div>
                        {orders?.data?.length === 0 && (
                            <p className='text-center'>No Orders Found...</p>
                        )}
                        {orders?.data.map(order =>
                            order.items.map(item => (
                                <OrderItem
                                    orderId={order?._id}
                                    id={item.productId?._id}
                                    categoryId={item?.productId?.categoryId}
                                    subCategoryId={item?.productId?.subCategoryId}
                                    productName={item?.productId?.productName}
                                    finalPrice={item?.finalPrice}
                                    status={item?.status}
                                    date={formatDate(order?.createdAt)}
                                    photo={item?.productId?.images[0]?.url}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyOrders;




// import React, { useEffect, useState } from 'react';
// import OrderItem from './OrderItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders } from '../../../redux/slices/orderSlice';

// const formatDate = (dateString) => {
//     const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', options);
// };

// const MyOrders = () => {
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const orders = useSelector((state) => state.orders.getOrders.data);

//     useEffect(() => {
//         setLoading(true);
//         dispatch(getOrders()).then(() => setLoading(false)); // Ensure loading state is set correctly after fetching orders
//     }, [dispatch]);

//     return (
//         <>
//             {loading && (
//                 <div className="loading-overlay">
//                     <div className="text-white font-TenorSans text-xl">Loading...</div>
//                 </div>
//             )}
//             <div className={`${loading ? 'opacity-50' : ''}`}>
//                 <div className='bg-white w-full h-[480px] no-scrollbar overflow-scroll py-[40px] font-TenorSans'>
//                     <div>
//                         {orders.length === 0 && (
//                             <p className='text-center'>No Orders Found...</p>
//                         )}
//                         {orders.map(order =>
//                             order.order_statuses
//                                 .filter(statusObj => statusObj.status !== "created")
//                                 .map((statusObj, index) =>
//                                     order.order_items.map(item => (
//                                         <OrderItem
//                                             id={item.productId}
//                                             categoryId={item.categoryId}
//                                             subCategoryId={item.subCategoryId}
//                                             key={`${item.id}-${index}`}
//                                             productName={item.productName}
//                                             finalPrice={item.finalPrice}
//                                             status={statusObj.status}
//                                             date={formatDate(item.createdAt)}
//                                             photo="https://via.placeholder.com/100"
//                                         />
//                                     ))
//                                 )
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default MyOrders;
