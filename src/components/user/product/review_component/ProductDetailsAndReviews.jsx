import React, { useState } from 'react';
import Tabs from './Tabs';
import ProductDetails from '../review_component/Details';
import Reviews from './Reviews';

const ProductDetailsAndReviews = ({ productId }) => {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="container mx-auto pt-4">
            <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
            {activeTab === "details" ? (
                <ProductDetails />
            ) : (
                <Reviews productId={productId} />
            )}
        </div>
    );
};

export default ProductDetailsAndReviews;
