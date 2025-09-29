const ServiceCardSkeleton = () => {
    return (
        <div className="bg-[#FFF9EF] rounded-lg border border-slate-300 overflow-hidden text-center p-3 animate-pulse">
            <div className="w-full h-44 bg-slate-300 rounded-md service-shimmer"></div>

            <div className="mt-4 h-6 bg-slate-300 rounded service-shimmer mx-4"></div>

            <div className="mt-2 h-10 w-30 bg-slate-300 rounded-md mx-auto service-shimmer"></div>

            <div className="mt-2 space-y-2">
                <div className="h-4 bg-slate-300 rounded service-shimmer mx-4"></div>
                <div className="h-4 bg-slate-300 rounded service-shimmer mx-8"></div>
            </div>

            <div className="mt-3 h-5 w-5 bg-slate-300 rounded-full mx-auto service-shimmer"></div>
        </div>
    );
};

export default ServiceCardSkeleton;
