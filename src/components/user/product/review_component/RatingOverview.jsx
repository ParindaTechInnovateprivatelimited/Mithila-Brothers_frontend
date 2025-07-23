import React from 'react';
import ProductReviews from '../../../../shared/StarRating';
import { useSelector } from 'react-redux';

const RatingOverview = () => {
    const { reviewsAndRatings } = useSelector((state) => state.productReviews);

    const reviews = reviewsAndRatings
    const totalReviews = reviews.length;
    const totalRating = reviews.map(review => review.rating).reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;


    const ratingCount = reviews.reduce((count, review) => {
        count[review.rating] = (count[review.rating] || 0) + 1;
        return count;
    }, {});

    return (
        <div className="mb-6">
            <div className=' align-middle py-auto flex gap-3 mt-1'>
                <ProductReviews reviews={parseFloat(averageRating)} />
                <span className="text-lg my-auto text-gray-500 mt-1 font-Poppins">({totalReviews} Reviews)</span>
            </div>

            <div className="mt-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                    const ratingPercentage = totalReviews > 0 ? ((ratingCount[rating] || 0) / totalReviews) * 100 : 0;
                    return (
                        <div key={rating} className="flex items-center mb-1">
                            <span className="mr-2 font-medium">{rating} stars</span>
                            <div className="flex-grow h-2 bg-gray-300 rounded-lg">
                                <div
                                    className="h-2 bg-primary rounded-lg"
                                    style={{
                                        width: `${ratingPercentage}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="ml-2">{ratingCount[rating] || 0}</span>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default RatingOverview;
