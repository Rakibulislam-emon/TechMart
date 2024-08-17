import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";

export default function ProductDetails() {
    const axiosCommon = useAxiosCommon()
    const { user } = useAuth()
    console.log('user:', user)
    const [quantity, setQuantity] = useState()
    const item = useLoaderData();

    const handleCart = async () => {
        const cartDetails = {
            ownerName: user?.displayName,
            ownerEmail: user?.email,
            id: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: quantity
        }
        try {
            const res = await axiosCommon.post('/addToCart', cartDetails)
            console.log(res.data);
            if (res.data.insertedId) {
                toast.success('Added to cart', res.data.insertedId)
            }
        } catch (error) {
            console.log('error:', error)

        }
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    {/* Product Image */}
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-auto rounded-lg shadow-md mb-4"
                            id="mainImage"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-4">Brand: {item.brand}</p>
                        <p className="text-gray-600 mb-4">SKU: {item._id}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${item.price}</span>
                            <span className="text-gray-500 line-through">
                                ${item.price + 50}
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            {/* Star Rating */}
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={index < item.ratings ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className={`w-6 h-6 ${index < item.ratings ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">{item.ratings} (120 reviews)</span>
                        </div>
                        <p className="text-gray-700 mb-6">{item.description}</p>

                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity:
                            </label>
                            <input
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                defaultValue="1"
                                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <button onClick={handleCart} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6.36 6H19.5"
                                    />
                                </svg>
                                Add to Cart
                            </button>
                            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
