import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsByQuery } from '../../../../services/searchService';
import { IoSearchOutline } from 'react-icons/io5';

const DEBOUNCE_DELAY = 300;

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlighted, setHighlighted] = useState(-1);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const debounceTimeout = useRef();

    // Debounced search
    const debouncedSearch = useCallback((query) => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            handleSearch(query);
        }, DEBOUNCE_DELAY);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, []);

    const handleSearch = async (query) => {
        if (!query) {
            setResults([]);
            setShowDropdown(false);
            setError('');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const result = await fetchProductsByQuery(query);
            setResults(result);
            setShowDropdown(true);
        } catch (error) {
            setError('Failed to fetch products.');
            setResults([]);
            setShowDropdown(true);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setHighlighted(-1);
        debouncedSearch(value);
    };

    const handleLinkClick = () => {
        setInput('');
        setResults([]);
        setShowDropdown(false);
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showDropdown || results.length === 0) return;
        if (e.key === 'ArrowDown') {
            setHighlighted((prev) => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            setHighlighted((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            if (highlighted >= 0 && highlighted < results.length) {
                const product = results[highlighted];
                window.location.href = `/${product.categoryId._id}/${product.subCategoryId._id}/${product._id}`;
                setShowDropdown(false);
            }
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative border border-black sm:border-none rounded-md" ref={dropdownRef}>
            <div className="flex items-center gap-2 md:w-[243px] bg-[#F5F5F5] py-[7px] px-[20px] rounded transition-shadow focus-within:shadow-lg">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="What are you looking for?"
                    value={input}
                    onChange={handleInputChange}
                    onFocus={() => input && setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    className="text-sm leading-snug font-normal tracking-wide w-full bg-transparent outline-none border-black"
                    aria-autocomplete="list"
                    aria-controls="search-dropdown"
                    aria-activedescendant={highlighted >= 0 ? `search-result-${highlighted}` : undefined}
                />
                <IoSearchOutline className="text-xl" />
                {loading && (
                    <svg className="animate-spin h-5 w-5 text-gray-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                )}
            </div>
            {showDropdown && (
                <div
                    id="search-dropdown"
                    className="absolute left-0 right-0 sm:mt-2 mt-4 sm:w-[350px] w-full bg-white/80 sm:bg-white/10 border border-border1 rounded-xl backdrop-blur-md shadow-2xl max-h-72 overflow-y-auto z-20 transition-all duration-200"
                    role="listbox"
                >
                    {loading && <p className="m-2 text-primary">Loading...</p>}
                    {error && <p className="m-2 text-error">{error}</p>}
                    {!loading && !error && results?.length === 0 && input && (
                        <p className="m-2 text-text2">No results found.</p>
                    )}
                    {results?.length > 0 && (
                        <ul className="list-none py-2 divide-y divide-border1">
                            {results.map((product, idx) => (
                                <Link
                                    to={`/${product.categoryId._id}/${product.subCategoryId._id}/${product._id}`}
                                    key={product._id}
                                    onClick={handleLinkClick}
                                    tabIndex={-1}
                                >
                                    <li
                                        id={`search-result-${idx}`}
                                        className={`flex items-center gap-3 py-2 px-3 bg-transparent cursor-pointer transition-colors duration-150 rounded-lg group ${
                                            highlighted === idx ? 'bg-brand-light text-white shadow-lg' : 'text-text1 hover:bg-primary hover:shadow-md focus:bg-brand-light focus:shadow-lg'
                                        }`}
                                        onMouseEnter={() => setHighlighted(idx)}
                                        role="option"
                                        aria-selected={highlighted === idx}
                                    >
                                        {/* Product Image */}
                                        <div className="w-10 h-10 flex-shrink-0 rounded bg-surface flex items-center justify-center overflow-hidden border border-border1 group-hover:border-primary">
                                            {product.images && product.images[0].url ? (
                                                <img src={product.images[0].url} alt={product.productName} className="object-contain w-full h-full" />
                                            ) : (
                                                <IoSearchOutline className="text-xl text-text2" />
                                            )}
                                        </div>
                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-[15px] truncate">
                                                {/* Highlight search term */}
                                                {input
                                                    ? product.productName.split(new RegExp(`(${input})`, 'gi')).map((part, i) =>
                                                        part.toLowerCase() === input.toLowerCase() ? (
                                                            <span key={i} className="bg-brand-light text-brand font-semibold rounded px-0.5">{part}</span>
                                                        ) : (
                                                            <span key={i}>{part}</span>
                                                        )
                                                    )
                                                    : product.productName}
                                            </div>
                                            <div className="text-xs  truncate">
                                                {product.categoryId?.name} {product.subCategoryId?.name && <>| {product.subCategoryId.name}</>}
                                            </div>
                                        </div>
                                        {/* Price */}
                                        {product.price && (
                                            <div className="ml-2 text-sm font-semibold text-primary whitespace-nowrap">
                                                ₹{product.price}
                                            </div>
                                        )}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

