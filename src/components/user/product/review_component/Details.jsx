import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

const Details = () => {
    const products = useSelector((state) => state.products.selectedProduct);

    return (
        <motion.div
            className='bg-white sm:backdrop-blur-md sm:shadow-lg sm:rounded-xl sm:p-2'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.01 }}
        >
            <div className="product-details">
                <h2 className="text-2xl font-bold mb-4">{products.product.productName}</h2>
                <div
                    className="p-2 bg-gray-100 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: products.product.description }}
                />
            </div>
        </motion.div>
    );
};

export default Details;
