import React from 'react';
import ProductReviews from './StarRating';

const data = {
    success: true,
    message: "Product reviews",
    data: [
        {
            id: "LMyIXxUQDVofsrgvp0n7N",
            userId: "7nCBeCD4yK-D0-74B6kSq",
            productId: "L01jW9YL068WcP0NoELg8",
            rating: 4,
            review: "Nice product",
            createdAt: "2024-08-05T13:34:22.778Z",
            updatedAt: "2024-08-05T13:34:22.771Z",
        },
        {
            id: "cJtQmoa63Vnk1cMEc6wOk",
            userId: "7nCBeCD4yK-D0-74B6kSq",
            productId: "L01jW9YL068WcP0NoELg8",
            rating: 2,
            review: "Nice product",
            createdAt: "2024-08-05T13:34:28.753Z",
            updatedAt: "2024-08-05T13:34:28.750Z",
        },
        {
            id: "TYbK0YF8mNlLPthDBgFM2",
            userId: "7nCBeCD4yK-D0-74B6kSq",
            productId: "L01jW9YL068WcP0NoELg8",
            rating: 1,
            review: "Nice product",
            createdAt: "2024-08-05T13:34:34.926Z",
            updatedAt: "2024-08-05T13:34:34.924Z",
        },
    ],
};

export const ReactRate = () => {
    return <ProductReviews reviews={data.data} />;
};

