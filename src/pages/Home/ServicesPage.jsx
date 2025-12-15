import Breadcrumbs from "../../components/breadcrum";
import Testimonials from "../../components/testimonial";
import AppDownloadBooking from "../../components/AppDownloadBooking";
import leftImage from "../../assets/helperImages/leftDesign.png"
import rightImage from "../../assets/helperImages/rightDesign.png"
import { useState, useEffect } from "react";
import { getPublicServices } from "../../api";
import ServicesCard from "../../components/Cards/ServicesCard";
import ServiceCardSkeleton from "../../components/Loader/ServiceCardSkeleton";
import { formBtn3 } from "../../utils/CustomClass";
import { PulseLoader } from "react-spinners";

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 12;

    const fetchServices = async (page = 1, isLoadMore = false) => {
        try {
            setLoading(true);
            const response = await getPublicServices({
                p: page,
                records: recordsPerPage,
            });

            if (response?.data) {
                if (isLoadMore) {
                    setServices(prev => [...prev, ...response.data]);
                } else {
                    setServices(response.data);
                }
                setHasMore(response.data.length === recordsPerPage);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
            if (!isLoadMore) {
                setInitialLoading(false);
            }
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchServices(nextPage, true);
    };


    useEffect(() => {
        fetchServices();
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16 relative">
            <div className="absolute top-50 -left-80 ">
                <img
                    src={rightImage}
                    className="w-[500px]   h-[500px] object-contain spin-slow"
                    alt="left design"
                />
            </div>

            <div className="absolute top-1/4 -right-80 ">
                <img
                    src={rightImage}
                    className="w-[500px] h-[500px] object-contain spin-slow"
                    alt="right design"
                />
            </div>
            <Breadcrumbs />

            <section className="w-full lg:py-2 xl:py-4 px-5 xl:px-0 container mx-auto z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {initialLoading && (
                        <>
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <ServiceCardSkeleton key={`skeleton-${idx}`} />
                            ))}
                        </>
                    )}

                    {!initialLoading && services && services?.map((service, idx) => (
                        <div key={service.id || idx} className="service-card-enter">
                            <ServicesCard service={service} idx={idx} />
                        </div>
                    ))}
                </div>

                {services?.length === 0 && !loading && !initialLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No services found.</p>
                    </div>
                )}

                {hasMore && services?.length > 0 && !initialLoading && (
                    <div className="text-center mt-12 mb-10 justify-self-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className={`${formBtn3} !w-auto disabled:opacity-90 ${loading ? ' cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Loading...' : 'Load More Services'}
                        </button>
                    </div>
                )}

                {loading && services?.length === 0 && !initialLoading && (
                    <div className="flex justify-center py-12">
                        <PulseLoader color="#000" size={4} />
                    </div>
                )}
            </section>
            <Testimonials />
            <AppDownloadBooking />
        </div>
    );
};

export default ServicesPage;
