import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import FilterAccordion from './FilterAccordion';
import ColorCircle from './ColorCircle';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard, { ProductCardSkeleton } from '../components/user/product/component/ProductCard';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Breadcrumbs from './Breadcrumbs';
import { useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { FiFilter, FiArrowDownCircle, FiX } from 'react-icons/fi';

// Custom hook for debounced values
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Custom hook for intersection observer
const useInfiniteScroll = (callback, hasMore, isLoading) => {
    const sentinelRef = useRef();

    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    callback();
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before the sentinel
            }
        );

        const sentinel = sentinelRef.current;
        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
            observer.disconnect();
        };
    }, [callback, hasMore, isLoading]);

    return sentinelRef;
};

const ProductFilterPage = () => {
    const { categoryId, subCategoryId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.products.allProducts.isLoading);
    const error = useSelector((state) => state.products.allProducts.error);

    // State management
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    
    // Product and pagination state
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        itemsPerPage: 9,
        totalItems: 0
    });
    
    // Loading and request management
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const requestInProgressRef = useRef(false);
    const abortControllerRef = useRef(null);
    const mountedRef = useRef(true);

    // Cache management
    const cacheRef = useRef(new Map());
    const lastFetchParamsRef = useRef(null);

    // Debounce filter changes
    const debouncedFilters = useDebounce({
        selectedSizes,
        selectedColor,
        selectedPriceRange,
        sortOption
    }, 400);

    // Calculate if we have more items to load
    const hasMore = useMemo(() => {
        const totalLoadedItems = products.length;
        return totalLoadedItems < pagination.totalItems;
    }, [products.length, pagination.totalItems]);

    // Generate cache key
    const getCacheKey = useCallback((params, pageNum) => {
        const { categoryId, subCategoryId, color, size, priceRange, sorting } = params;
        return JSON.stringify({ 
            categoryId, 
            subCategoryId, 
            color, 
            size: size?.sort(), 
            priceRange: priceRange?.sort(), 
            sorting, 
            page: pageNum 
        });
    }, []);

    // Check if filters have changed
    const filtersChanged = useMemo(() => {
        const currentParams = {
            categoryId,
            subCategoryId,
            color: debouncedFilters.selectedColor,
            size: debouncedFilters.selectedSizes,
            priceRange: debouncedFilters.selectedPriceRange,
            sorting: debouncedFilters.sortOption
        };

        if (!lastFetchParamsRef.current) {
            return true;
        }

        return JSON.stringify(lastFetchParamsRef.current) !== JSON.stringify(currentParams);
    }, [categoryId, subCategoryId, debouncedFilters]);

    // Main fetch function
    const fetchProducts = useCallback(async (pageNum = 0, isReset = false) => {
        // Prevent duplicate requests
        if (requestInProgressRef.current) {
            console.log('Request already in progress, skipping...');
            return;
        }

        // Check if we're trying to load beyond available items
        if (!isReset && pageNum > 0 && !hasMore) {
            console.log('No more items to load');
            return;
        }

        const params = {
            categoryId,
            subCategoryId,
            color: debouncedFilters.selectedColor,
            size: debouncedFilters.selectedSizes,
            priceRange: debouncedFilters.selectedPriceRange,
            sorting: debouncedFilters.sortOption
        };

        const cacheKey = getCacheKey(params, pageNum);

        // Check cache first (only for non-initial loads)
        if (!isReset && cacheRef.current.has(cacheKey)) {
            console.log('Loading from cache for page:', pageNum);
            const cachedData = cacheRef.current.get(cacheKey);
            
            if (pageNum === 0) {
                setProducts(cachedData.products);
                setColors(cachedData.colors);
                setPagination(cachedData.pagination);
            } else {
                setProducts(prev => {
                    const existingIds = new Set(prev.map(p => p._id));
                    const newProducts = cachedData.products.filter(p => !existingIds.has(p._id));
                    return [...prev, ...newProducts];
                });
            }
            return;
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        requestInProgressRef.current = true;

        // Set loading states
        if (pageNum === 0) {
            if (products.length === 0) {
                setIsInitialLoad(true);
            }
        } else {
            setIsLoadingMore(true);
        }

        try {
            console.log(`Fetching products for page ${pageNum}...`);
            
            const response = await dispatch(fetchAllProducts({
                ...params,
                page: pageNum,
                signal: abortControllerRef.current.signal
            })).unwrap();

            if (!mountedRef.current) return;

            const { data } = response;
            const { data: newProducts = [], colors: newColors = [], pagination: newPagination = {} } = response;

            // Cache the response
            cacheRef.current.set(cacheKey, {
                products: newProducts,
                colors: newColors,
                pagination: newPagination
            });

            // Limit cache size
            if (cacheRef.current.size > 20) {
                const firstKey = cacheRef.current.keys().next().value;
                cacheRef.current.delete(firstKey);
            }

            // Update state
            if (isReset || pageNum === 0) {
                setProducts(newProducts);
                setColors(newColors);
                setPagination(newPagination);
            } else {
                // Append new products, avoiding duplicates
                setProducts(prev => {
                    const existingIds = new Set(prev.map(p => p._id));
                    const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id));
                    return [...prev, ...uniqueNewProducts];
                });
                // Update pagination for total items
                setPagination(newPagination);
            }

            // Update last fetch params
            lastFetchParamsRef.current = params;

            console.log(`Successfully loaded ${newProducts.length} products for page ${pageNum}`);

        } catch (error) {
            if (!mountedRef.current) return;
            
            if (error.name !== 'AbortError') {
                console.error('Error fetching products:', error);
            }
        } finally {
            if (mountedRef.current) {
                requestInProgressRef.current = false;
                setIsLoadingMore(false);
                setIsInitialLoad(false);
                abortControllerRef.current = null;
            }
        }
    }, [categoryId, subCategoryId, debouncedFilters, dispatch, getCacheKey, hasMore, products.length]);

    // Handle load more
    const handleLoadMore = useCallback(() => {
        if (!hasMore || isLoadingMore || requestInProgressRef.current) {
            return;
        }

        const nextPage = pagination.currentPage + 1;
        fetchProducts(nextPage, false);
    }, [hasMore, isLoadingMore, pagination.currentPage, fetchProducts]);

    // Infinite scroll
    const sentinelRef = useInfiniteScroll(handleLoadMore, hasMore, isLoadingMore);

    // Effect for initial load and filter changes
    useEffect(() => {
        if (!categoryId) {
            // Load all products when no category
            dispatch(fetchAllProducts())
                .unwrap()
                .then(response => {
                    const { data } = response;
                    setProducts(data.products || []);
                    setColors(data.colors || []);
                    setPagination(data.pagination || {});
                    setIsInitialLoad(false);
                })
                .catch(error => {
                    console.error('Error fetching all products:', error);
                    setIsInitialLoad(false);
                });
            return;
        }

        if (filtersChanged) {
            console.log('Filters changed, resetting and fetching page 0...');
            setProducts([]);
            setPagination({ currentPage: 0, itemsPerPage: 9, totalItems: 0 });
            fetchProducts(0, true);
        }
    }, [categoryId, filtersChanged, fetchProducts, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Filter handlers
    const handleSizeChange = useCallback((size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    }, []);

    const handleColorSelect = useCallback((color) => {
        setSelectedColor(prevColor => prevColor === color ? null : color);
    }, []);

    const handlePriceChange = useCallback((priceObj) => {
        setSelectedPriceRange(prev => {
            const exists = prev.some(p => p.lowPrice === priceObj.lowPrice && p.highPrice === priceObj.highPrice);
            return exists ? [] : [priceObj];
        });
    }, []);

    const handleResetFilters = useCallback(() => {
        console.log('Resetting filters...');
        setSelectedSizes([]);
        setSelectedColor(null);
        setSelectedPriceRange([]);
        setSortOption('');
        
        // Clear cache for fresh data
        cacheRef.current.clear();
        lastFetchParamsRef.current = null;
    }, []);

    const handleSortChange = useCallback((event) => {
        setSortOption(event.target.value);
    }, []);

    const toggleFilter = useCallback(() => {
        setShowFilter(prev => !prev);
    }, []);


    if (error) {
        return <div className='text-center font-TenorSans'>Error: {error}</div>;
    }

    return (
        <div className='xl:px-[135px] lg:px-[100px] md:px-[60px] py-6 min-h-[60vh] '>
            <div className='text-center sm:mb-3'></div>
            <div className='sm:mt-[40px] sm:mb-[40px] px-[20px] sm:px-0'>
                <Breadcrumbs />
            </div>

            {/* Mobile Filter/Sort Controls */}
            <div className="sticky top-0 sm:mt-5 bg-white/80 rounded-xl flex justify-around mb-4 lg:hidden py-2 border border-border1">
                <button
                    className="py-1 px-3 text-[13px] bg-primary text-white rounded-lg lg:hidden"
                    onClick={toggleFilter}
                >
                    Filters
                </button>
                <select
                    className="py-1 bg-transparent outline-none border border-border1 rounded-md"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="">Sort by</option>
                    <option value="lowtohigh">Low to High</option>
                    <option value="hightolow">High to Low</option>
                </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 border-black">
                {/* Filter Sidebar */}
                <aside className={`fixed inset-0 bg-white backdrop-blur border border-border1 py-4 px-4 lg:w-[300px] xl:w-[350px] lg:h-full rounded-xl overflow-y-auto lg:sticky lg:top-28 ${showFilter ? 'block' : 'hidden'} lg:block`}>
                    <div className="sticky top-0  backdrop-blur rounded-t-xl pb-2 mb-2 border-b border-border1 flex items-center gap-2">
                        <FiFilter className="w-5 h-5 text-primary" />
                        <span className="text-lg font-semibold text-text1 tracking-wide">Filters</span>
                        <button
                        className="absolute top-2 right-3 lg:hidden p-1 rounded-full hover:bg-bg2 transition"
                        onClick={toggleFilter}
                        aria-label="Close filter sidebar"
                        type="button"
                    >
                        <FiX className="w-6 h-6 text-text2" />
                    </button>
                    </div>

                    <FilterAccordion title="Sizes">
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL', '2X'].map(size => (
                                <button
                                    key={size}
                                    className={`px-4 py-2 border rounded-lg transition-all duration-150 ${selectedSizes.includes(size) 
                                        ? 'bg-primary/10 border-primary text-primary font-semibold shadow' 
                                        : 'border-border1 text-text2 hover:bg-primary/5 hover:border-primary'}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </FilterAccordion>

                    <FilterAccordion title="Colors">
                        <div className="flex flex-wrap gap-2">
                            {colors.map(color => (
                                <div key={color._id}>
                                    <div data-tip={color.name} data-for={`tooltip-${color.name}`}>
                                        <ColorCircle
                                            color={color}
                                            selected={color.name === selectedColor}
                                            onSelect={() => handleColorSelect(color.name)}
                                        />
                                    </div>
                                    <ReactTooltip id={`tooltip-${color.name}`} effect="solid" place="top" />
                                </div>
                            ))}
                        </div>
                    </FilterAccordion>

                    <FilterAccordion title="Price Range">
                        {[
                            { range: 'Under 1000', lowPrice: 0, highPrice: 1000 },
                            { range: '1000 - 2000', lowPrice: 1000, highPrice: 2000 },
                            { range: '2000 - 3000', lowPrice: 2000, highPrice: 3000 },
                            { range: '3000 - 4000', lowPrice: 3000, highPrice: 4000 },
                            { range: '4000 - 5000', lowPrice: 4000, highPrice: 5000 }
                        ].map(({ range, lowPrice, highPrice }) => (
                            <label key={range} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedPriceRange.some(p => p.lowPrice === lowPrice && p.highPrice === highPrice)}
                                    onChange={() => handlePriceChange({ lowPrice, highPrice })}
                                    className="appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-blue-600 checked:border-transparent"
                                />
                                <span>{range}</span>
                            </label>
                        ))}
                    </FilterAccordion>

                    <div className="my-4">
                        <button
                            className="w-full px-4 py-2 bg-transparent text-right hover:underline"
                            onClick={handleResetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                <main className="w-full font-PlayfairDisplay px-2 sm:px-5 lg:border-black overflow-y-auto">
                    {/* Desktop Sort Controls */}
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-xl shadow border border-border1 mb-4">
                        <FiArrowDownCircle className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-text1">Sort by:</span>
                        <div className="relative">
                            <select
                                className="appearance-none bg-transparent border-none outline-none font-medium text-text1 pr-6 pl-2 py-1 rounded focus:ring-2 focus:ring-primary"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <option value="">Select</option>
                                <option value="lowToHigh">Low to High</option>
                                <option value="highToLow">High to Low</option>
                            </select>
                            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Products Info */}
                    {pagination.totalItems > 0 && (
                        <div className="text-sm text-text2 mb-4 px-2">
                            Showing {products.length} of {pagination.totalItems} products
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 mx-auto py-4">
                        {products.map(product => (
                            <div key={product._id} className="mb-10 sm:mb-5 w-auto mx-auto">
                                <ProductCard product={product} />
                            </div>
                        ))}
                        {isLoading && Array.from({ length: Math.min(8, pagination.itemsPerPage || 8) }).map((_, idx) => (
                            <div key={idx} className="mb-10 sm:mb-5 w-auto mx-auto">
                                <ProductCardSkeleton />
                            </div>
                        ))}
                    </div>


                    {/* Infinite Scroll Sentinel */}
                    {hasMore && <div ref={sentinelRef} className="h-8" />}

                    {/* Load More Button (Fallback) */}
                    {hasMore && !isLoadingMore && products.length > 0 && (
                        <div className="flex justify-center p-10">
                            <button
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                onClick={handleLoadMore}
                                disabled={isLoadingMore || requestInProgressRef.current}
                            >
                                Load More ({pagination.totalItems - products.length} remaining)
                            </button>
                        </div>
                    )}

                    {/* End Message */}
                    {!hasMore && products.length > 0 && (
                        <div className="text-center py-8">
                            <p className="text-text2 text-lg">
                                🎉 You've viewed all {pagination.totalItems} products!
                            </p>
                            <p className="text-text2 text-sm mt-2">
                                Try adjusting your filters to see more options.
                            </p>
                        </div>
                    )}

                    {/* No Products Message */}
                    {!isInitialLoad && products.length === 0 && !isLoading && (
                        <div className="text-center py-20">
                            <p className="text-text2 text-lg mb-4">No products found matching your filters.</p>
                            <button
                                onClick={handleResetFilters}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilter && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 lg:hidden" 
                    onClick={toggleFilter}
                />
            )}
        </div>
    );
};

export default ProductFilterPage;