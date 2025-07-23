import React from 'react';
import ReviewList from './ReviewList';
import AddReviewForm from './AddReviewForm';
import RatingOverview from './RatingOverview';
import { motion } from 'framer-motion';


const Reviews = ({ productId }) => {
    return (
        <motion.div
        className='bg-white sm:backdrop-blur-md sm:shadow-lg rounded-xl sm:p-6'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.01 }}
    >
        <div className="reviews-section">
            <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
            <RatingOverview />
            <ReviewList />
            <AddReviewForm id={productId} />
        </div>
        </motion.div>
    );
};

export default Reviews;
