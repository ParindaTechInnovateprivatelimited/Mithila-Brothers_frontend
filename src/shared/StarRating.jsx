import React from 'react';
import StarRatings from 'react-star-ratings'

const ProductReviews = ({ reviews }) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }} className='text-lg flex'>
                <StarRatings
                    rating={reviews || 0}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="1px"
                />
            </div>

        </div>
    );
};

export default ProductReviews;
