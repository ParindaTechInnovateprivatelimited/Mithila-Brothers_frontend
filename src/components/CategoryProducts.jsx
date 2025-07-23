import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './user/product/component/ProductCard';

const CategoryProducts = ({ category }) => {
    const products = useSelector((state) => state.products.products);
    const filteredProducts = products.filter((product) => product.category === category);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-5 border-black mx-auto py-4">
            {filteredProducts.map((product) => (
                <div key={product.id} className="mb-10 sm:mb-5  w-auto mx-auto">
                <ProductCard product={product} />
            </div>
            ))}
        </div>
    );
};

export default CategoryProducts;
