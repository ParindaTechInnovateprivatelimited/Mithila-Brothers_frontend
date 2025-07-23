import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../components/user/product/component/ProductCard';
import { fetchAllProducts } from '../redux/slices/productSlice';

const SimilarProductsPage = ({ categoryId, subCategoryId }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoryId && subCategoryId) {
            dispatch(fetchAllProducts({ categoryId, subCategoryId }))
                .unwrap()
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching similar products:', error);
                });
        }
    }, [categoryId, subCategoryId, dispatch]);

    return (
        <div className=" py-5">
            <div className='text-start mb-5'>
                <div className="h-10 justify-start items-center gap-x-4 inline-flex ">
                    <div className="w-5 h-10 relative">
                        <div className="w-5 h-10 left-0 top-0 absolute bg-primary rounded" />
                    </div>
                    <div className="text-primary text-base font-semibold font-Poppins leading-tight">Related Item</div>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 border-black mx-auto py-4">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="mb-10 sm:mb-5  w-auto mx-auto">
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <p>No similar products found.</p>
                )}
            </div>

        </div>
    );
};

export default SimilarProductsPage;
