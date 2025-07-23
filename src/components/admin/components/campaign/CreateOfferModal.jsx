import React, { useState } from 'react';
import { createOffer } from '../../../../services/adminProducts';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getOffers } from '../../../../redux/slices/categorySlice';

const OfferModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [offerData, setOfferData] = useState({
        offerName: '',
        offerDescription: '',
        offerType: 'percentOff',
        percentOff: '',
        offerPrice: ''
    });

    const handleOfferChange = (e) => {
        const { name, value } = e.target;
        setOfferData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitOffer = async () => {
        try {
            await toast.promise(createOffer(offerData),
                {
                    loading: 'Creating Offer...',
                    success: (response) => `${response.message}`,
                    error: (err) => `${err.message}`,
                });
            dispatch(getOffers())
            onClose();
        } catch (error) {
            console.log(error)
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-medium mb-4">Create Offer</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Offer Name:</label>
                        <input
                            type="text"
                            name="offerName"
                            value={offerData.offerName}
                            onChange={handleOfferChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Offer Description:</label>
                        <input
                            type="text"
                            name="offerDescription"
                            value={offerData.offerDescription}
                            onChange={handleOfferChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Offer Type:</label>
                        <select
                            name="offerType"
                            value={offerData.offerType}
                            onChange={handleOfferChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="percentOff">Percent Off</option>
                            <option value="offerPrice">Offer Price</option>
                        </select>
                    </div>
                    {offerData.offerType === 'percentOff' && (
                        <div>
                            <label className="block text-[#8e95a9] text-sm font-medium">Percent Off:</label>
                            <input
                                type="number"
                                name="percentOff"
                                value={offerData.percentOff}
                                onChange={handleOfferChange}
                                className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    )}
                    {offerData.offerType === 'offerPrice' && (
                        <div>
                            <label className="block text-[#8e95a9] text-sm font-medium">Offer Price:</label>
                            <input
                                type="number"
                                name="offerPrice"
                                value={offerData.offerPrice}
                                onChange={handleOfferChange}
                                className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-end mt-4 gap-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmitOffer}
                        className="w-full py-2 bg-primary text-white rounded-lg hover:bg-red-600"
                    >
                        Submit Offer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferModal;
