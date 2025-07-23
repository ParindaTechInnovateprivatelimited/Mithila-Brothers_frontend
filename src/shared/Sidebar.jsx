import { useState } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import Logout from '../components/user/profile/component/Logout'

const Sidebar = () => {
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleOpenPopup = () => {
        setIsLogoutPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsLogoutPopupOpen(false);
    };

    const { pathname } = useResolvedPath('');
    const matchProfile = useMatch(`${pathname}/profile`);
    const matchOrders = useMatch(`${pathname}/orders`);
    const matchAddressBook = useMatch(`${pathname}/address-book`);

    return (
        <>
            <nav className="lg:w-1/5 hidden lg:block text-black/50 text-sm font-light font-['Poppins'] ">
                <p className="text-black xl:text-base font-medium font-['Poppins'] leading-normal mb-[16px]">Manage My Account</p>
                <ul className="space-y-4 px-[35px]">
                    <li>
                        <NavLink
                            to="profile"
                            className={`block ${matchProfile ? 'text-primary font-normal' : ''}`}
                        >
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="address-book"
                            className={`block ${matchAddressBook ? 'text-primary  font-normal' : ''}`}
                        >
                            Address Book
                        </NavLink>
                    </li>
                </ul>
                <p className="text-black xl:text-base mt-[24px] font-medium font-['Poppins'] leading-normal mb-[16px]">My Orders</p>
                <ul className="space-y-4 px-[35px]">

                    <li>
                        <NavLink
                            to="orders"
                            className={`block ${matchOrders ? 'text-primary opacity-100 font-normal' : ''}`}
                        >
                            My Orders
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="detail"
                            className={`block ${matchDetailsDemo ? 'text-primary font-semibold' : ''}`}
                        >
                            Order Details Demo
                        </NavLink>
                    </li> */}

                </ul>
                <p className="text-black xl:text-base mt-[24px] font-medium font-['Poppins'] leading-normal mb-[16px]">My Wishlist</p>
                <ul className="space-y-4 px-[35px]">
                    <li>
                        <button
                            onClick={handleOpenPopup}
                            className="w-full text-left"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

            <Logout
                isOpen={isLogoutPopupOpen}
                onClose={handleClosePopup}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default Sidebar;






// import React, { useEffect, useState } from 'react';
// import FilterAccordion from './FilterAccordion';
// import ColorCircle from './ColorCircle';
// import { useSelector, useDispatch } from 'react-redux';
// import ProductCard from '../components/product/ProductCard';
// import { fetchAllProducts } from '../redux/slices/productSlice';
// import Breadcrumbs from './Breadcrumbs';
// import { useParams } from 'react-router-dom';

// const ProductFilterPage = ({ title, subtitle }) => {
//     const { categoryId, subCategoryId } = useParams();
//     const dispatch = useDispatch();
//     const allProducts = useSelector((state) => state.products.allProducts.data);
//     const isLoading = useSelector((state) => state.products.allProducts.isLoading);
//     const error = useSelector((state) => state.products.allProducts.error);

//     const [selectedSizes, setSelectedSizes] = useState([]);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const [selectedPriceRange, setSelectedPriceRange] = useState([]);
//     const [page, setPage] = useState(0);
//     const [hasMore, setHasMore] = useState(true);
//     const [products, setProducts] = useState([]);
//     const [sortOption, setSortOption] = useState('');
//     const [showFilter, setShowFilter] = useState(false);

//     console.log(page)
//     useEffect(() => {
//         if (categoryId !== undefined && categoryId !== null) {
//             setHasMore(true);
//             dispatch(fetchAllProducts({
//                 categoryId,
//                 subCategoryId,
//                 color: selectedColor,
//                 size: selectedSizes,
//                 priceRange: selectedPriceRange,
//                 sorting: sortOption,
//                 page
//             }))
//                 .unwrap()
//                 .then(response => {
//                     setProducts(response.products);
//                     if (response.products.length === 0) {
//                         setHasMore(false);
//                     }
//                     setShowFilter(false);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching products:', error);
//                 });
//         } else {
//             console.error("Category ID is undefined. Please pass a valid category ID.");
//         }
//     }, [categoryId, subCategoryId, selectedColor, selectedSizes, selectedPriceRange, dispatch, sortOption, page]);

//     useEffect(() => {
//         if (categoryId !== undefined && categoryId !== null && categoryId !== '' && page > 0 && hasMore === true) {

//             dispatch(fetchAllProducts({
//                 categoryId,
//                 subCategoryId,
//                 color: selectedColor,
//                 size: selectedSizes,
//                 priceRange: selectedPriceRange,
//                 sorting: sortOption,
//                 page
//             }))
//                 .unwrap()
//                 .then(response => {
//                     setProducts(prevProducts => [...prevProducts, ...response.products]);
//                     if (response.products.length === 0) {
//                         setHasMore(false);
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching products:', error);
//                 });
//         }
//     }, [page, categoryId, subCategoryId, selectedColor, selectedSizes, selectedPriceRange, dispatch, hasMore, sortOption]);

//     const colors = allProducts?.colors || [];

//     const handleSizeChange = (size) => {
//         setSelectedSizes(prev =>
//             prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
//         );
//     };

//     const handleColorSelect = (color) => {
//         setSelectedColor(color);
//     };

//     const handlePriceChange = (price) => {
//         setSelectedPriceRange(prev =>
//             prev.includes(price) ? [] : [price]
//         );
//     };


//     const handleLoadMore = () => {
//         if (hasMore) {
//             setPage(prevPage => prevPage + 1);
//         }
//     };

//     const handleResetFilters = () => {
//         setSelectedSizes([]);
//         setSelectedColor(null);
//         setSelectedPriceRange([]);
//         setPage(0);
//         setHasMore(true);
//         setProducts([]);

//         dispatch(fetchAllProducts({
//             categoryId,
//             subCategoryId,
//             page: 0,
//         }))
//             .unwrap()
//             .then(response => {
//                 setProducts(response.products);
//                 if (response.products.length === 0) {
//                     setHasMore(false);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error);
//             });
//     };

//     const handleSortChange = (event) => {
//         setSortOption(event.target.value);
//     };

//     const toggleFilter = () => {
//         setShowFilter(!showFilter);
//     };

//     if (isLoading && page === 0) return <p className="text-center">Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
// <>
//     <div className='text-center mb-3'>
//         <h2 className="sm:text-5xl text-xl font-thin font-BerkshireSwash border-b pb-3 border-[#2F2F2F] inline-block">
//             {title} <span className='text-sm sm:text-2xl font-BerkshireSwash'>{subtitle}</span>
//         </h2>
//     </div>
//     <div className='mx-5 mt-3'><Breadcrumbs /></div>
//     <div className="sticky mt-5 bg-transparent lg:hidden py-2 shadow-sm flex justify-around mb-4">
//         <button
//             className="py-1 px-3 text-[13px] bg-[#754F23] text-white rounded-lg lg:hidden"
//             onClick={toggleFilter}
//         >
//             {showFilter ? 'Filters' : 'Filters'}
//         </button>
//         <select
//             className="py-1  bg-transparent outline-none border-black rounded-md"
//             value={sortOption}
//             onChange={handleSortChange}
//         >
//             <option value="">Sort by</option>
//             <option value="lowtohigh">Low to High</option>
//             <option value="hightolow">High to Low</option>
//         </select>
//     </div>

//     <div className="flex flex-col lg:flex-row">
//         <aside className={`fixed inset-0 z-50 bg-white p-4 lg:w-[300px] xl:w-auto lg:h-full lg:bg-transparent overflow-y-auto lg:sticky lg:top-28 ${showFilter ? 'block' : 'hidden'} lg:block`}>
//             <p className='text-black text-base font-medium font-PlayfairDisplay tracking-widest'>Filters</p>
//             <FilterAccordion title="Sizes">
//                 <div className="flex flex-wrap gap-2">
//                     {['S', 'M', 'L', 'XL', '2X'].map(size => (
//                         <button
//                             key={size}
//                             className={`px-4 py-2 border border-black ${selectedSizes.includes(size) ? 'bg-[#754F23] text-white' : 'text-black'}`}
//                             onClick={() => handleSizeChange(size)}
//                         >
//                             {size}
//                         </button>
//                     ))}
//                 </div>
//             </FilterAccordion>

//             <FilterAccordion title="Colors">
//                 <div className="flex flex-wrap gap-2">
//                     {colors.map(color => (
//                         <ColorCircle
//                             key={color}
//                             color={color}
//                             selected={color === selectedColor}
//                             onSelect={() => handleColorSelect(color)}
//                         />
//                     ))}
//                 </div>
//             </FilterAccordion>

//             <FilterAccordion title="Price Range">
//                 {[
//                     { range: 'Under 1000', lowPrice: 0, highPrice: 1000 },
//                     { range: '1000 - 2000', lowPrice: 1000, highPrice: 2000 },
//                     { range: '2000 - 3000', lowPrice: 2000, highPrice: 3000 }
//                 ].map(({ range, lowPrice, highPrice }) => (
//                     <label key={range} className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={selectedPriceRange.includes(range)}
//                             onChange={() => handlePriceChange({ lowPrice, highPrice })}
//                             className="appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-blue-600 checked:border-transparent"
//                         />
//                         <span>{range}</span>
//                     </label>
//                 ))}
//             </FilterAccordion>


//             {/* Reset Filters Button */}
//             <div className="my-4">
//                 <button
//                     className="w-full px-4 py-2 bg-transparent text-right hover:underline"
//                     onClick={handleResetFilters}
//                 >
//                     Reset Filters
//                 </button>
//             </div>
//         </aside>

//         <main className="w-full font-PlayfairDisplay px-5 lg:border-black overflow-y-auto">
//             {/* Sticky Sort and Filter Bar */}
//             <div className="px-5 bg-transparent hidden lg:flex justify-end">
//                 <select
//                     className="py-1  bg-transparent outline-none border-black rounded-md"
//                     value={sortOption}
//                     onChange={handleSortChange}
//                 >
//                     <option value="">Sort by</option>
//                     <option value="lowtohigh">Low to High</option>
//                     <option value="hightolow">High to Low</option>
//                 </select>
//             </div>
//             <div className=''>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 border-black mx-auto py-4">
//                     {products.map(product => (
//                         <div key={product.id} className="mb-10 sm:mb-5  w-auto mx-auto">
//                             <ProductCard product={product} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {hasMore && !isLoading && (
//                 <div className="flex justify-end p-10">
//                     <button
//                         className="px-4 py-2 bg-[#754F23] text-white rounded-lg"
//                         onClick={handleLoadMore}
//                     >
//                         Load More
//                     </button>
//                 </div>
//             )}
//             {isLoading && <p className="text-center">Loading more products...</p>}
//             {!hasMore && <p className="text-center">No more products available.</p>}
//         </main>
//     </div>

//     {/* Background Overlay */}
//     {showFilter && <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={toggleFilter}></div>}
// </>
//     );
// }

// export default ProductFilterPage;
