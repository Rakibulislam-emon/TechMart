import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/images/logo/logo1.jpg';
import { Link } from 'react-router-dom';
import { useFilter } from '../../Provider/FilterProvider';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);

    const { filters, setFilters } = useFilter(); // Use FilterContext
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setFilters((prevFilters) => ({ ...prevFilters, searchTerm: e.target.value }));
      };

    const handleSortChange = (e) => {
        setFilters(prev => ({ ...prev, sortOption: e.target.value }));
    };

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleMouseEnter = () => {
        setIsModalVisible(true);
    };

    const handleMouseLeave = () => {
        setIsModalVisible(false);
    };

    const axiosCommon = useAxiosCommon();
    // get all products 
    const { data: products = [] } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await axiosCommon.get('/allProducts');
            return response.data;
        },
        refetchInterval: 10000, // refetch every 10 seconds
    });

    useEffect(() => {
        if (products.length) {
            const uniqueBrands = [...new Set(products.map(item => item.brand))];
            const uniqueCategories = [...new Set(products.map(item => item.category))];
            const uniquePriceRanges = getUniquePriceRanges(products);

            setBrands(uniqueBrands);
            setCategories(uniqueCategories);
            setPriceRanges(uniquePriceRanges);
        }
    }, [products]);

    const getUniquePriceRanges = (data) => {
        const prices = data.map(item => item.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const interval = 500; // Define your interval size here
        const ranges = [];
        for (let i = minPrice; i < maxPrice; i += interval) {
            const start = i;
            const end = Math.min(i + interval, maxPrice);
            ranges.push(`${start} - ${end}`);
        }
        return ranges;
    };

    return (
        <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-2xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0 lg:mr-8">
                            <a href="#" title="">
                                <img
                                    className="hidden mix-blend-lighten w-full size-16 dark:block"
                                    src={logo}
                                    alt="Logo"
                                />
                            </a>
                        </div>

                        {/* Search and Filters (visible on large screens) */}
                        <div className={`hidden lg:flex lg:items-center lg:space-x-4 lg:mr-8 ${isMenuOpen ? 'hidden' : ''}`}>
                            <div className="relative flex-grow">
                                <input
                                    className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-gray-200">
                                    <FaSearch className="text-gray-500" />
                                </button>
                            </div>
                            <select
                                className="border border-gray-300 rounded-lg py-2 px-4"
                                value={filters.sortOption}
                                onChange={handleSortChange}
                            >
                                <option value="" disabled>Sort by</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="date-new">Date: Newest</option>
                            </select>
                            <select
                                name="brand"
                                className="border border-gray-300 rounded-lg py-2 px-4"
                                value={filters.brand}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <select
                                name="category"
                                className="border border-gray-300 rounded-lg py-2 px-4"
                                value={filters.category}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <select
                                name="priceRange"
                                className="border border-gray-300 rounded-lg py-2 px-4"
                                value={filters.priceRange}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Price Range</option>
                                {priceRanges.map(range => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                            <button
                               
                                type="button"
                                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                            >
                                <span className="sr-only">Cart</span>
                                <svg
                                    className="w-5 h-5 lg:me-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                    />
                                </svg>
                                <span className="hidden sm:flex">My Cart</span>
                                <svg
                                    className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 9-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="flex items-center space-x-4 mb-4 lg:z-10">
                                <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                                        Hello, Log In <br /> Account & Orders
                                    </button>
                                    {isModalVisible && (
                                        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg">
                                            <div className="p-4 flex flex-col items-center space-y-4">
                                                <Link to={'/login'}>
                                                    <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                                                        Login
                                                    </button>
                                                </Link>
                                                <Link to={'/register'}>
                                                    <button className="w-full py-2 px-4 border text-green-700 rounded-lg shadow-md hover:bg-green-700 hover:text-white">
                                                        Create an account
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} p-4 mt-4`}>
                    {/* Search and Filters (hidden when menu is open) */}
                    <div className={`flex flex-col space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="relative">
                            <input
                                className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-gray-200">
                                <FaSearch className="text-gray-500" />
                            </button>
                        </div>
                        <select
                            className="border border-gray-300 rounded-lg py-2 px-4"
                            value={filters.sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="" disabled>Sort by</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="date-new">Date: Newest</option>
                        </select>
                        <select
                            name="brand"
                            className="border border-gray-300 rounded-lg py-2 px-4"
                            value={filters.brand}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Brand</option>
                            {brands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                        <select
                            name="category"
                            className="border border-gray-300 rounded-lg py-2 px-4"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            name="priceRange"
                            className="border border-gray-300 rounded-lg py-2 px-4"
                            value={filters.priceRange}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Price Range</option>
                            {priceRanges.map(range => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>
                    </div>
                    {/* Login Section */}
                    <div className=''>
                        <button className='btn  mt-2 w-full'>search</button>
                    </div>
                    <button
                        id="myCartDropdownButton1"
                        data-dropdown-toggle="myCartDropdown1"
                        type="button"
                        className="flex border my-2  text-white items-center rounded-lg justify-center w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none  dark:text-white"
                    >
                        <span className="text-white ">Cart</span>
                        <svg
                            className="w-5 h-5 lg:me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                            />
                        </svg>
                        <span className="hidden sm:flex">My Cart</span>
                        <svg
                            className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center z-10 mt-2">
                        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                                Hello, Log In <br /> Account & Orders
                            </button>
                            {isModalVisible && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <div className="p-4 flex flex-col items-center space-y-4">
                                            <Link to={'/login'}>
                                                <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                                                    Login
                                                </button>
                                            </Link>
                                            <Link to={'/register'}>
                                                <button className="w-full py-2 px-4 border text-green-700 rounded-lg shadow-md hover:bg-green-700 hover:text-white">
                                                    Create an account
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
