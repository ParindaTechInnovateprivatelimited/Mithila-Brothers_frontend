import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ productName, orderId, finalPrice, status, date, photo, id, categoryId, subCategoryId }) => {
    function capitalizeStatus(status) {
        return status
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    return (
        <Link to={`details/${orderId}`} key={orderId}>
            <div className="flex flex-row  bg-primary  p-2 sm:p-4 mb-4">
                <Link to={`/${categoryId}/${subCategoryId}/${id}`}>
                    <img
                        src={photo}
                        alt={productName}
                        className="sm:h-16 sm:w-16 h-10 w-10 mr-2 md:mr-4"
                    />
                </Link>
                <div className="flex-1 text-left space-y-2 ">
                    <h3 className="text-xs sm:text-lg text-white font-normal line-clamp-1">{productName}</h3>
                    <p className="text-xs sm:text-base text-white">&#8377;{finalPrice}</p>
                </div>
                <div className="text-right space-y-2">
                    <p className="text-xs sm:text-base ml-2 lg:ml-5 text-white">{capitalizeStatus(status)}</p>
                    <p className="text-xs sm:text-base text-white">{date}</p>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
