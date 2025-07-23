import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ activeTab, onTabClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-5 w-full mb-6"
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-4 w-full py-2 border-b-2 \ transition-colors duration-300 ${activeTab === "details" ? "border-primary" : "border-gray-200"
                    }`}
                onClick={() => onTabClick("details")}
            >
                Product Details
            </motion.button>
            <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-4 w-full py-2 border-b-2 transition-colors duration-300 ${activeTab === "reviews" ? "border-primary " : "border-gray-200"
                    }`}
                onClick={() => onTabClick("reviews")}
            >
                Reviews
            </motion.button>
        </motion.div>
    );
};

export default Tabs;
