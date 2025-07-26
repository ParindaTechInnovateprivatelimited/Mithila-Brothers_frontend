import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { updateProducts } from '../../../../services/adminServices';
import { fetchProducts } from '../../../../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const UpdateProductModal = ({ isOpen, onClose, product }) => {
    const dispatch = useDispatch();
    const [updatedProduct, setUpdatedProduct] = useState({
        productName: '',
        stock: '',
        price: '',
        size: '',
        description: ''
    });

    useEffect(() => {
        if (product) {
            setUpdatedProduct({
                productName: product.productName || '',
                stock: product.stock || '',
                price: product.price || '',
                size: product.size?.join(', ') || '',
                description: product.description || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const formattedProduct = {
            productName: updatedProduct.productName.trim(),
            price: parseFloat(updatedProduct.price),
            description: updatedProduct.description.trim(),
            stock: parseInt(updatedProduct.stock, 10),
            size: updatedProduct.size.split(',').map(s => s.trim()).filter(Boolean)
        };

        const updatePromise = updateProducts(product._id, formattedProduct);

        toast.promise(
            updatePromise,
            {
                loading: 'Updating product...',
                success: 'Product updated successfully!',
                error: (err) =>
                    err?.response?.data?.message || 'Failed to update product. Please try again.',
            }
        );
        try {
            const res = await updatePromise;
            onClose(); // Close modal or drawer
            dispatch(fetchProducts()); // Refresh the product list
        } catch (error) {
            console.error('Update failed:', error);
        }

    };

    if (!isOpen) return null;

    return (
        <motion.div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold mb-4">Product Update Info</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={updatedProduct.productName}
                                onChange={handleChange}
                                placeholder="Product Name"
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Stocks:</label>
                            <input
                                type="text"
                                name="stock"
                                value={updatedProduct.stock}
                                onChange={handleChange}
                                placeholder="Stocks"
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Size:</label>
                            <input
                                type="text"
                                name="size"
                                value={updatedProduct.size}
                                onChange={handleChange}
                                placeholder="Size"
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">Product Description</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Product Description:</label>
                            <textarea
                                name="description"
                                value={updatedProduct.description}
                                onChange={handleChange}
                                placeholder="Product Description..."
                                rows="10"
                                className='mt-1 p-2 border rounded w-full'
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
                            className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold"
                            onClick={handleSubmit}
                        >
                            Save Product
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UpdateProductModal;
