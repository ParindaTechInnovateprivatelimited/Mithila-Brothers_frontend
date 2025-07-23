import React, { useState } from 'react';
import ProductReviews from '../../../../shared/StarRating';
import { useSelector } from 'react-redux';

const ReviewList = () => {
    const { error, loading, reviewsAndRatings } = useSelector((state) => state.productReviews);
    const reviews = reviewsAndRatings;

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closePreview = () => {
        setSelectedImage(null);
    };

    return (
        <div className="">
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <p>Loading reviews...</p>
                </div>
            )}

            {error && (
                <div className="text-primary text-center">
                    <p>Error: {error}</p>
                </div>
            )}

            {!loading && !error && reviews?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews?.map((review) => (
                        <div key={review?._id} className="px-4 pb-2 border mb-4 rounded-lg shadow-md">
                            <ProductReviews reviews={parseInt(review?.rating)} />

                            <p>
                                <strong>{review?.name}</strong>
                            </p>
                            <p>{review?.message}</p>

                            <div className="flex space-x-4 mt-2">
                                {review?.images?.map((image) => (
                                    <img
                                        key={image.order}
                                        src={image.url}
                                        alt={`Review ${image.order}`}
                                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                                        onClick={() => handleImageClick(image.url)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && !error && <p>No reviews yet. Be the first to review!</p>
            )}

            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
                    onClick={closePreview}
                >
                    <div className="relative">
                        <img src={selectedImage} alt="Selected Preview" className="max-w-full p-5 max-h-full rounded-lg" />
                        <button
                            className="absolute top-2 right-2 bg-white text-primary rounded-full h-8 w-8 shadow-md"
                            onClick={closePreview}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
