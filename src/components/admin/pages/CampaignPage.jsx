import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getOffers } from "../../../redux/slices/categorySlice";

import CampaignModal from "../components/campaign/CampaignModal";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import ProductsTable from "../components/products/ProductsTable";
import AddCategoryModal from "../components/campaign/AddCetegoryModal";
import AddSubCategoryModal from "../components/campaign/AddSubCategoryModal";
import CategoryAccordion from "../components/campaign/CategoryAccordion";
import AddProductModal from "../components/campaign/AddProductModal";
import OfferModal from "../components/campaign/CreateOfferModal";

const CampaignPage = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isProductModalOpen, setProductIsModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        dispatch(getOffers())
    }, [dispatch]);

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleAddSubCategory = (categoryId, subCategoryName) => {
        const updatedCategories = categories.map((category) =>
            category.id === categoryId
                ? { ...category, subCategories: [...category.subCategories, subCategoryName] }
                : category
        );
        setCategories(updatedCategories);
    };


    // const openProductModal = () => setProductIsModalOpen(true);
    // const closeProductModal = () => setProductIsModalOpen(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className='flex-1 overflow-auto relative z-0'>
            <Header title={"Campaign"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className=' mb-8'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-8 flex gap-8 justify-end">
                        <button
                            className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug"
                            onClick={() => setIsOfferModalOpen(true)}
                        >
                            Add / Create Offer
                        </button>
                        <button
                            className="px-4 py-3 bg-primary hover:opacity-80 text-white rounded justify-start items-start gap-4 inline-flex text-sm font-semibold font-Inter leading-snug"
                            onClick={openModal}
                        >
                            Add / Create Campaign
                        </button>
                        <OfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />
                        <CampaignModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>

                    <AddProductModal />
                </motion.div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
                    <AddCategoryModal
                        onAddCategory={handleAddCategory}
                    />
                    <AddSubCategoryModal
                        categories={categories}
                        onAddSubCategory={handleAddSubCategory}
                    />
                    <CategoryAccordion />
                </div>

                <ProductsTable />
                <AIPoweredInsights />
            </main>
        </div>
    );
};
export default CampaignPage;
