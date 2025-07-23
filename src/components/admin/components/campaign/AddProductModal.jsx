import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../../../services/upload';
import { addProduct } from '../../../../services/adminProducts';
import toast from 'react-hot-toast';
import { fetchProduct } from '../../../../redux/slices/productSlice';

const AddProductModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedOfferId, setSelectedOfferId] = useState("");
    const [selectedSubCategoryId, setSubSelectedCategoryId] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const formRef = useRef(null);
    const [productData, setProductData] = useState({
        productName: '',
        price: '',
        description: '',
        color: { name: '', colorCode: '' },
        categoryId: '',
        subCategoryId: '',
        size: [],
        offer: null,
        rating: '',
        reviewCount: '',
        stock: '',
        images: []
    });


    const [imagePreviews, setImagePreviews] = useState([]);

    const data = useSelector((state) => state.category);
    const offers = useSelector((state) => state.category.offer);

    const categories = data?.categories || [];


    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategoryId(selectedCategoryId);

        const selectedCategory = categories.find(category => category._id === selectedCategoryId);
        setSubCategories(selectedCategory ? selectedCategory.subCategories : []);

        setProductData(prevState => ({
            ...prevState,
            categoryId: selectedCategoryId,
            subCategoryId: ''
        }));
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        setSubSelectedCategoryId(selectedSubCategoryId);
        setProductData(prevState => ({
            ...prevState,
            subCategoryId: selectedSubCategoryId
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleColorChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            color: {
                ...prevState.color,
                [name]: value
            }
        }));
    };

    const handleOfferChange = (e) => {
        const offerId = e.target.value;
        setSelectedOfferId(offerId)
        setProductData(prevState => ({
            ...prevState,
            offer: offerId
        }));
    };

    const handleImageUpload = async(e) => {
        const files = Array.from(e.target.files);
        const imageFiles = await upload(files)
        setImagePreviews(imageFiles);
        setProductData(prevState => ({
            ...prevState,
            images: imageFiles
        }));
    };

    const handleSubmit = async() => {
        const formattedData = {
            ...productData,
            price: parseFloat(productData.price),
            rating: parseFloat(productData.rating),
            reviewCount: parseInt(productData.reviewCount),
            stock: parseInt(productData.stock),
            size: productData.size.split(',').map(size => size.trim()),
            offer: [productData.offer]
        };
        await toast.promise(
            addProduct(formattedData),
            {
                loading: 'Creating Product...',
                success: (response) => `${response.message}`,
                error: (err) => `${err.message}`,
            }
        )
        await dispatch(fetchProduct())
        // console.log('Submitting product data:', formattedData);
    };
    const handleReset = () => {
        setProductData({
            productName: '',
            price: '',
            description: '',
            color: { name: '', colorCode: '' },
            categoryId: '',
            subCategoryId: '',
            size: '',
            offer: {
                offerName: '',
                offerDescription: '',
                offerType: 'percentOff',
                percentOff: '',
                offerPrice: ''
            },
            rating: '',
            reviewCount: '',
            stock: '',
            images: []
        });
        setSelectedCategoryId('');
        setSubSelectedCategoryId('');
        setSubCategories([]);
        setImagePreviews([]);
    };


    return (
        <div className="flex justify-center w-full items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full" ref={formRef}>


                <h2 className="text-2xl font-medium mb-4">Add Product</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            placeholder="ex. The Indian Garage Co"
                            value={productData.productName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Price:</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="ex. 799"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Description:</label>
                        <textarea
                            name="description"
                            placeholder="ex. Men Relaxed Fit Trousers"
                            value={productData.description}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Color Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="ex. Mod Mauve"
                            value={productData.color.name}
                            onChange={handleColorChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Color Code:</label>
                        <input
                            type="text"
                            name="colorCode"
                            placeholder="ex. #C7B2D6"
                            value={productData.color.colorCode}
                            onChange={handleColorChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Select Category:</label>
                        <select
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                            name='offer'
                            className=" appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="">Select a category</option>
                            {categories.length > 0 && categories.map((category) => (
                                <option key={category?._id} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Select Subcategory:</label>
                        <select
                            value={selectedSubCategoryId}
                            onChange={handleSubCategoryChange}
                            className=" appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="">Select a category</option>
                            {subCategories.length > 0 && subCategories.map((category) => (
                                <option key={category?._id} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Sizes (comma-separated):</label>
                        <input
                            type="text"
                            name="size"
                            placeholder="30, 32, 34"
                            value={productData.size}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Offer Details */}
                <h2 className="text-2xl font-medium mt-6 mb-4">Offer Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Select Offer:</label>
                        <select
                        onChange={handleOfferChange}
                        value={selectedOfferId}
                        className="appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Select an offer</option>
                        {offers.map((offer) => (
                            <option key={offer._id} value={offer._id}>
                                {offer.offerName} - {offer.offerDescription}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Other Details */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            step="0.1"
                            value={productData.rating}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Review Count:</label>
                        <input
                            type="number"
                            name="reviewCount"
                            value={productData.reviewCount}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[#8e95a9] text-sm font-medium">Stock Quantity:</label>
                        <input
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mt-6">
                    <label className="block text-[#8e95a9] text-sm font-medium">Upload Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="mt-2"
                    />
                    <div className="mt-4 flex space-x-4">
                        {imagePreviews.map(image => (
                            <img
                                key={image.url}
                                src={image.url}
                                alt={`Preview ${image.order}`}
                                className="h-20 w-20 object-cover rounded"
                            />
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={handleReset}
                        className="bg-gray-300 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
