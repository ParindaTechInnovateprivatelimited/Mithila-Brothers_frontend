import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryProducts from './CategoryProducts';

const CategoryPage = () => {
    const { category } = useParams();

    return (
        <div className="container mx-auto my-5">
            <h2 className="text-3xl font-bold text-center mb-5 capitalize">{category}</h2>
            <CategoryProducts category={category} />
        </div>
    );
};

export default CategoryPage;
