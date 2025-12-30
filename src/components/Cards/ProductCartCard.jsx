import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../utils/useCurrency';

const ProductCartCard = ({ item, index, isUpdating, removeItem, updateQuantity }) => {
    const navigate = useNavigate();
    const currencySymbol = useCurrency();

    return (
        <div
            key={item._id}
            className="bg-[#8B3FC1] rounded-lg p-4 flex flex-col md:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 cart-item-enter cursor-pointer hover:bg-[#9E52D8] transition-colors"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/product/${item.productId || item._id}`)}
        >
            <div
                className="relative w-full md:w-32 h-44 md:h-32  mx-auto aspect-square rounded-lg overflow-hidden"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)',
                }}
            >
                <img
                    src={item?.images?.[0] || item?.image}
                    alt={item?.name || item?.title}
                    className="w-full h-full object-contain p-2 bg-slate-50 "
                    loading="lazy"
                />
            </div>

            <div className="flex-1 w-full">
                <h3 className="font-bold text-white text-lg mb-1 sm:pr-6">{item.name}</h3>
                <div className="space-y-1">
                    <div className="font-medium text-lg text-white">
                        {currencySymbol}
                        {item?.price?.toLocaleString()}
                    </div>
                    <div className="text-white text-sm">
                        {item?.mrp && (
                            <span>
                                MRP
                                <span className="line-through">
                                    {currencySymbol}
                                    {item?.mrp?.toLocaleString()}
                                </span>
                            </span>
                        )}
                        <span className={item?.mrp ? 'ml-1' : ''}>(incl. of all taxes)</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full md:w-auto flex-row-reverse justify-between  md:flex-col md:items-end space-y-2 md:mt-2 ">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item?._id || item?.id);
                    }}
                    disabled={isUpdating}
                    className={`p-2 text-white rounded-md transition-colors flex-shrink-0 ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8B3FC1]'
                        }`}
                >
                    <FaRegTrashAlt className="w-4 h-4" />
                </button>

                <div className="flex gap-4 items-center">
                    <span className="text-white text-sm font-medium">QTY:</span>
                    <div className="flex items-center rounded-md bg-white overflow-hidden w-28 h-9 border border-gray-300">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item?._id || item?.id, (item?.quantity || 1) - 1);
                            }}
                            disabled={isUpdating || (item?.quantity || 1) <= 1}
                            className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${isUpdating || (item?.quantity || 1) <= 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-gray-100'
                                }`}
                        >
                            -
                        </button>

                        <div className="flex-1 text-center font-medium text-gray-900">
                            {item?.quantity}
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item?._id || item?.id, (item?.quantity || 1) + 1);
                            }}
                            disabled={isUpdating}
                            className={`w-9 h-full flex items-center justify-center text-gray-600 transition-colors ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                                }`}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCartCard;
