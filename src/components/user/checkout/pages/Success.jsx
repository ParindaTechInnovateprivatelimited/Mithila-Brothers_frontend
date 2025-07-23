import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SuccessAnimation from '../component/SuccessAnimation';
import FailedAnimation from '../component/FailedAnimation';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const orderData = JSON.parse(decodeURIComponent(params.get('data'))) || {};

    const isSuccess = orderData.status && orderData.status.toLowerCase() === 'success';

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSuccess) {
                navigate(`/my-account/orders/details/${orderData.udf1}`);
            } else {
                navigate('/cart');
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate, orderData.udf1, isSuccess]);

    return (
        <div className="sm:flex sm:flex-col w-auto items-center justify-center text-white">
            <div className="bg-white text-center p-5 sm:rounded-lg sm:shadow-lg">
                <div className="mt-6">
                    {isSuccess ? <SuccessAnimation /> : <FailedAnimation />}
                </div>

                <h1 className={`text-2xl sm:text-3xl font-bold mb-4 ${isSuccess ? 'text-green-500' : 'text-primary'}`}>
                    {orderData.field9 || (isSuccess ? 'Payment Successful!' : 'Payment Failed')}
                </h1>
                
                <p className="text-lg sm:text-xl mb-2 text-gray-700">
                    {isSuccess ? 'Thank you for your purchase!' : 'We’re sorry, your transaction could not be completed.'}
                </p>

                <div className="mt-6 text-black text-start">
                    <p className="text-md sm:text-lg flex justify-between font-semibold">
                        Status: 
                        <span className={`font-bold ${isSuccess ? 'text-green-500' : 'text-primary'} line-clamp-1`}>
                            {orderData.status}
                        </span>
                    </p>
                    <p className="text-md sm:text-lg flex justify-between font-semibold mt-2 line-clamp-1">
                        Txn ID: 
                        <span className="font-bold text-primary">{orderData.txnid}</span>
                    </p>
                    <p className="text-md sm:text-lg flex justify-between font-semibold mt-2">
                        Total: 
                        <span className="font-bold text-primary">₹{orderData.amount}</span>
                    </p>
                </div>

                <div className="flex justify-center space-x-6 sm:space-x-10 mt-6">
                    {isSuccess ? (
                        <Link
                            to={`/my-account/orders/details/${orderData.udf1}`}
                            className="inline-block text-sm sm:text-base px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            View Orders
                        </Link>
                    ) : (
                        <Link
                            to="/cart"
                            className="inline-block text-sm sm:text-base px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Try Again
                        </Link>
                    )}
                    <Link
                        to="/"
                        className="inline-block text-sm sm:text-base px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Go to Home
                    </Link>
                </div>

                <p className="mt-4 text-gray-300">Redirecting you to {isSuccess ? 'your orders' : 'your cart'} in 10 seconds...</p>
            </div>
        </div>
    );
};

export default Success;
