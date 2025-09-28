const AddressSkeletonGrid = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center justify-between mb-3">
                <div className="h-5 bg-gray-200 rounded service-shimmer w-20"></div>
                <div className="h-4 bg-gray-200 rounded service-shimmer w-16"></div>
            </div>

            {/* Address lines skeleton */}
            <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 rounded service-shimmer w-full"></div>
                <div className="h-4 bg-gray-200 rounded service-shimmer w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded service-shimmer w-1/2"></div>
            </div>

            {/* Phone/Contact skeleton */}
            <div className="h-4 bg-gray-200 rounded service-shimmer w-32 mb-3"></div>

            {/* Action buttons skeleton */}
            <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded service-shimmer w-16"></div>
                <div className="h-8 bg-gray-200 rounded service-shimmer w-16"></div>
            </div>
        </div>
    );
};

export default AddressSkeletonGrid;
