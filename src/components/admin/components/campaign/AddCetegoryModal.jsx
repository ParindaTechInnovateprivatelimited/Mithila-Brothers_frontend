import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../../redux/slices/categorySlice";
import categoryService from '../../../../services/categoryService'
import toast from "react-hot-toast";

const AddCategoryModal = () => {
    const dispatch = useDispatch()
    const [name, setCategoryName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                categoryService.createCategory({ name }),
                
                {
                    loading: 'Creating Category...',
                    success: (response) => `${response.message}`,
                    error: (err) => `${err.message}`,
                }
            );
            await dispatch(getCategories())
        } catch (error) {
            console.log(error)
            // alert(error.response.data.message)
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
                <h2 className='text-xl font-normal text-black mb-4'>Create Category</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="text-[#8e95a9] text-sm font-normal font-Inter leading-snug mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className=" appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </>
    );
};

export default AddCategoryModal;
