import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import categoryService from "../../../../services/categoryService";
import { getCategories } from "../../../../redux/slices/categorySlice";

const AddSubCategoryModal = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const dispatch = useDispatch()

    const data = useSelector((state) => state.category);

    const categories = data?.categories || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCategoryId && subCategoryName) {
                await toast.promise(
                    categoryService.addSubCategory(selectedCategoryId, subCategoryName),
                    {
                        loading: 'Adding to Subcategory...',
                        success: (response) => `${response.message}`,
                        error: (err) => `${err.message}`,
                    }
                );
                await dispatch(getCategories())
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <motion.div
                className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className='text-xl font-normal text-black mb-4'>Add Subcategory</h2>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="text-[#8e95a9] text-sm font-normal font-Inter leading-snug mb-2">Subcategory Name</label>
                                <input
                                    type="text"
                                    value={subCategoryName}
                                    onChange={(e) => setSubCategoryName(e.target.value)}
                                    className=" appearance-none border mt-2 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter subcategory name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="text-[#8e95a9] text-sm font-normal font-Inter leading-snug mb-2">Select Category</label>
                                <select
                                    value={selectedCategoryId}
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                                    className=" appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Select a category</option>
                                    {categories.length > 0 && categories.map((category) => (
                                        <option key={category?._id} value={category?._id}>
                                            {category?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug"
                                >
                                    Add Subcategory
                                </button>
                            </div>
                        </form>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </>
    );
};

export default AddSubCategoryModal;
