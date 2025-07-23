import React from 'react';
import { motion } from "framer-motion";

const CampaignModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
				>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4">Campaign Info</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Campaign Name:</label>
                        <input
                            type="text"
                            placeholder="ex. Birthday Offer"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Brands/Outlets:</label>
                        <input
                            type="text"
                            placeholder="Hard Rock cafe, Koregaon park"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Channels:</label>
                        <input
                            type="text"
                            placeholder="Email, SMS"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Audience</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Target Customers:</label>
                        <input
                            type="number"
                            placeholder="5,000"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email Only:</label>
                        <input
                            type="number"
                            placeholder="2,750"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">SMS Only:</label>
                        <input
                            type="number"
                            placeholder="2,250"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Time Manage</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Check:</label>
                        <select className="mt-1 p-2 border rounded w-full">
                            <option>Every hour</option>
                            {/* Add other options */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Time Range:</label>
                        <select className="mt-1 p-2 border rounded w-full">
                            <option>Today</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Run Length:</label>
                        <select className="mt-1 p-2 border rounded w-full">
                            <option>Active Days</option>
                        </select>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Create Rules</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">If Spend:</label>
                        <input
                            type="text"
                            placeholder="$100"
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug">
                        Save Campaign
                    </button>
                </div>
            </div>
        </div>
        </motion.div>
    );
};

export default CampaignModal;
