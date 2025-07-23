import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getCategoryById, getSubCategoryById } from '../redux/slices/categorySlice';
import { useDispatch } from 'react-redux';

const Breadcrumbs = ({ productName }) => {
    const dispatch = useDispatch()
    const params = useParams();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            if (params.categoryId && params.categoryId !== 'product') {
                try {
                    const response = await dispatch(getCategoryById(params.categoryId));
                    setCategoryName(response?.payload?.category?.name);
                } catch (error) {
                    console.error("Failed to fetch category:", error);
                }
            }

            if (params.subCategoryId) {
                try {
                    const response = await dispatch(getSubCategoryById(params.subCategoryId));
                    setSubCategoryName(response?.payload?.category?.name);
                } catch (error) {
                    console.error("Failed to fetch subcategory:", error);
                }
            }
        };

        fetchCategoryDetails();
    }, [dispatch, params.categoryId, params.subCategoryId]);

    const formatBreadcrumb = (breadcrumb) => {
        return breadcrumb
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="mb-4 my-auto font-Poppins">
            <ul className="flex">
                <li>
                    <Link to="/" className="sm:text-sm text-[10px] text-gray-400">
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const isProduct = isLast && productName;

                    const isCategory = value === params.categoryId && categoryName;
                    const isSubCategory = value === params.subCategoryId && subCategoryName;

                    return (
                        <li key={to} className="flex items-center text-[7px] mt-[5px] sm:mt-0 sm:text-sm">
                            <span className="mx-2 text-[5px] sm:text-sm">/</span>
                            {isLast ? (
                                isProduct ? (
                                    <span className="text-gray-700 text-[7px] sm:text-sm">
                                        {formatBreadcrumb(productName)}
                                    </span>
                                ) : (
                                    <span className="text-gray-700 text-[7px] sm:text-sm">
                                        {isCategory ? categoryName : isSubCategory ? subCategoryName : formatBreadcrumb(value)}
                                    </span>
                                )
                            ) : (
                                <Link to={to} className="text-gray-400 text-[7px] sm:text-sm">
                                    {isCategory ? categoryName : isSubCategory ? subCategoryName : formatBreadcrumb(value)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
