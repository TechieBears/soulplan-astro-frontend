const ProductCardSkeleton = () => {
    return (
        <div className="h-full flex flex-col bg-white p-3 rounded-lg shadow-lg border border-gray-100 animate-pulse">
            {/* Product Image Skeleton */}
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-lg overflow-hidden bg-gradient-to-r from-slate-200 to-slate-300">
                <div className="w-full h-full bg-slate-300 product-shimmer"></div>
            </div>

            {/* Product Details Skeleton */}
            <div className="pt-4 flex flex-col flex-grow">
                <div className="flex flex-grow justify-between items-start">
                    {/* Left side - Title & Rating Skeleton */}
                    <div className="flex flex-col w-full">
                        {/* Product Title */}
                        <div className="h-5 bg-slate-300 rounded product-shimmer mb-1 w-[150px] xl:w-52"></div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-2 sm:mb-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-4 h-4 bg-slate-300 rounded product-shimmer"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Price Skeleton */}
                    <div className="flex flex-col items-end space-y-0.5">
                        {/* MRP Price */}
                        <div className="h-4 w-10 bg-slate-300 rounded product-shimmer"></div>
                        {/* Selling Price */}
                        <div className="h-5 w-10 bg-slate-300 rounded product-shimmer"></div>
                    </div>
                </div>
            </div>

            {/* Add to Cart Button Skeleton */}
            <div className="w-full mt-2">
                <div className="h-10 bg-slate-300 rounded product-shimmer"></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
