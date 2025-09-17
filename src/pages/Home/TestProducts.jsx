import React from 'react';

const TestProducts = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Products Test Page</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                            <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
                            <p className="text-gray-600 mb-4">This is a test product description.</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-orange-600">₹3,520</span>
                                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestProducts;