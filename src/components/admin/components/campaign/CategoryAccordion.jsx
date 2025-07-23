import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoryById } from '../../../../redux/slices/categorySlice';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const CategoryAccordion = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const toggleCategory = (categoryId) => {
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
        dispatch(getCategoryById(categoryId));
    };

    return (
        <div className='bg-white shadow-lg rounded-xl p-6 '>
            <h2 className='text-xl font-normal text-black mb-4'>Category List</h2>
            <div className='overflow-scroll h-72 no-scrollbar px-4'>
                {categories.length > 0 && categories.map((category) => (
                    <div key={category?._id}>

                        <button onClick={() => toggleCategory(category?._id)} className="w-full text-sm lg:text-base text-left py-1 flex justify-between transition sm:pr-[16px]">
                            {category.name} ({category?.productCount})
                            <span className={` text-black transition-transform duration-100 ${expandedCategory === category?._id ? '-rotate-90' : 'rotate-0'}`}>
                                <MdOutlineArrowForwardIos />
                            </span>
                        </button>

                        {expandedCategory === category?._id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-4 pl-4 border-l border-gray-300">
                                {category.subCategories.length > 0 ? (
                                    category?.subCategories?.map((subcategory) => (
                                        <div key={subcategory?._id} className="cursor-pointer py-2 text-gray-600 hover:text-black">
                                            {subcategory?.name} ({subcategory?.productCount})
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No subcategories available</p>
                                )}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryAccordion;
