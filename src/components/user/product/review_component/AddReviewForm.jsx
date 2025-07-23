import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import toast from 'react-hot-toast';
import { postProductReview } from '../../../../services/productReview';
import { fetchReview } from '../../../../redux/slices/reviewSlice';
import { fetchProduct } from '../../../../redux/slices/productSlice';


const options = [
    { value: 5, label: "5 - Excellent" },
    { value: 4, label: "4 - Good" },
    { value: 3, label: "3 - Average" },
    { value: 2, label: "2 - Poor" },
    { value: 1, label: "1 - Very Poor" }
];

const AddReviewForm = ({  id }) => {
    const [loading, setLoading] = useState(false)
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()
    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedPhotos = [...selectedPhotos, ...files];
        if (updatedPhotos.length > 5) {
            alert("You can only upload a maximum of 5 photos.");
            return;
        }

        setSelectedPhotos(updatedPhotos);
    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = selectedPhotos.filter((_, i) => i !== index);
        setSelectedPhotos(updatedPhotos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const newReview = {
                name: `${user.firstName} ${user?.lastName}`,
                rating,
                message: reviewText
            };
            await toast.promise(
                postProductReview(id, newReview, selectedPhotos),
                {
                    loading: 'Adding Review...',
                    success: (response) => `${response.message}`,
                    error: (err) => `${err.response.data.message}`,
                }
            )
            dispatch(fetchReview(id));
            dispatch(fetchProduct(id))
            setRating(0);
            setReviewText('');
            setSelectedPhotos([]);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Your Review</label>
                <textarea
                    className="w-full p-2 border outline-primary"
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="relative">
                    <Select
                        className="w-full"
                        value={options.find(opt => opt.value === rating)}
                        onChange={(selectedOption) => setRating(selectedOption.value)}
                        options={options}
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#DB4444',
                                '&:hover': { borderColor: '#DB4444' },
                                boxShadow: 'none',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? '#DB4444' : 'white',
                                color: state.isSelected ? 'white' : 'black',
                                '&:hover': { backgroundColor: '#DB4444', color: 'white' }
                            })
                        }}
                    />

                </div>
            </div>


            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Photos (Max: 5)</label>
                <div className="flex items-center">
                    <label className="flex items-center justify-center bg-gray-200 cursor-pointer rounded-lg w-16 h-16">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePhotoChange}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v12a2 2 0 002 2h14a2 2 0 002-2V7m-5 3l-5 5m0 0l-5-5m5 5V9"
                            />
                        </svg>
                    </label>

                    <div className="flex ml-4 space-x-2">
                        {selectedPhotos.map((photo, index) => (
                            <div key={index} className="relative w-16 h-16  rounded-lg overflow-hidden">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-lg"
                                    onClick={() => handleRemovePhoto(index)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-2 w-2 text-red-600"
                                        viewBox="0 0 18 13"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 7.586 5.293 4.293a1 1 0 011.414-1.414L10 6.172l3.293-3.293a1 1 0 011.414 1.414L11.414 7.586l3.293 3.293a1 1 0 01-1.414 1.414L10 9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/80 focus:bg-primary text-white rounded-lg"
            >
                {loading ? 'Submitting' : 'Submit Review'}
            </button>
        </form>
    );
};

export default AddReviewForm;
