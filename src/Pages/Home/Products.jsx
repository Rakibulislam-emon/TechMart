import  { useState } from 'react';
import {Link} from "react-router-dom"
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useFilter } from '../../Provider/FilterProvider';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const axiosCommon = useAxiosCommon();
  const { filters } = useFilter();

  const { data: products = [] } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const response = await axiosCommon.get('/allProducts');
      return response.data;
    },
    refetchInterval: 10000,
  });

  // Filtering logic
  const filteredProducts = products
    .filter((product) => {
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const productName = product.name.toLowerCase();
        return productName.includes(searchTerm);
      }
      return (
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.category || product.category === filters.category) &&
        (!filters.priceRange || (
          product.price >= parseInt(filters.priceRange.split('-')[0], 10) &&
          product.price <= parseInt(filters.priceRange.split('-')[1], 10)
        ))
      );
    })
    .sort((a, b) => {
      if (filters.sortOption === 'price-asc') {
        return a.price - b.price;
      } else if (filters.sortOption === 'price-desc') {
        return b.price - a.price;
      } else if (filters.sortOption === 'date-new') {
        return new Date(b.creationDate) - new Date(a.creationDate);
      }
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <h2 className="text-2xl font-bold text-center my-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {paginatedProducts.map((item, idx) => (
          <Link to={`/details/${item._id}`} key={idx} className="bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-all relative">
            <div className="w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 p-2">
              <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
            </div>
            <div className="p-6">
              <hr className="border-2 mb-6" />
              <div>
                <h3 className="text-base text-gray-800">{item.name}</h3>
                <h4 className="text-xl text-gray-800 font-bold mt-4">${item.price.toFixed(2)}</h4>
              </div>
              <div className="flex items-center space-x-1.5 mt-4">
                <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <span className="text-sm text-gray-600">{item.ratings}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400 disabled:bg-gray-200"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button 
            key={pageNumber + 1} 
            onClick={() => handlePageChange(pageNumber + 1)} 
            className={`px-4 py-2 ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} hover:bg-gray-400`}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
