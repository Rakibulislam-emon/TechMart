import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons
import logo from '../../assets/images/logo/logo1.jpg';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Effect to reset the menu state on larger screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-2xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex justify-evenly">
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

                        <ul className={`lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                            {["Home", "Best Sellers", "Gift Ideas", "Today's Deals", "Sell"].map((item) => (
                                <li key={item} className="shrink-0">
                                    <a
                                        href="#"
                                        title=""
                                        className="flex mr-6 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4 lg:space-x-6 w-full">
                        {/* Search bar - only show when the menu is not open */}
                        {!isMenuOpen && (
                            <div className="relative ml-2 lg:ml-36 flex-grow">
                                <input
                                    className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    type="text"
                                    placeholder="Search..."
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-gray-200">
                                    <FaSearch className="text-gray-500" />
                                </button>
                            </div>
                        )}

                        <button
                            id="myCartDropdownButton1"
                            data-dropdown-toggle="myCartDropdown1"
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

                        <div className="text-white">
                            <h1>Login</h1>
                        </div>

                        {/* Menu toggle button */}
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
