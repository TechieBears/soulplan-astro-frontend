import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import corner1 from "../../assets/services/corner1.png";
import underline from "../../assets/undertext.png";
import { formBtn3 } from "../../utils/CustomClass";
import ServicesCard from "../Cards/ServicesCard";
import ServiceCardSkeleton from "../Loader/ServiceCardSkeleton";
import { PulseLoader } from "react-spinners";
import { getPublicServices } from "../../api";

export default function HomeBestServices() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const recordsPerPage = 8;

    useEffect(() => {
        const fetchServices = async () => {
            const response = await getPublicServices({ p: 1, records: recordsPerPage, search: '', category: '' });
            setLoading(true);
            setServices(response?.data || []);
            setHasMore((response?.data || []).length === recordsPerPage);
            setLoading(false);
            setInitialLoading(false);
        }
        fetchServices();
    }, []);

    const loadMoreServices = async () => {
        setLoading(true);
        const nextPage = currentPage + 1;
        const response = await getPublicServices({ p: nextPage, records: recordsPerPage, search: '', category: '' });
        const newServices = response?.data || [];
        setServices(prev => [...prev, ...newServices]);
        setCurrentPage(nextPage);
        setHasMore(newServices.length === recordsPerPage);
        setLoading(false);
    };

    return (
        <section className="py-16 !bg-[#FFF9EF] relative">
            <>
                <img src={corner1} alt="corner" className="absolute top-0 left-0 w-16 md:w-20 xl:w-24" />
                <img
                    src={corner1}
                    alt="corner"
                    className="absolute top-0 right-0 w-16 md:w-20 xl:w-24 rotate-90"
                />
            </>

            <div className="text-center mb-12">
                <>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                        <span className="text-p">Our Best Services</span>
                    </h2>
                    <img
                        src={underline}
                        alt="Underline"
                        className="w-40 md:w-56 h-10 mt-3 mx-auto"
                    />
                </>
            </div>

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


                {loading && services?.length === 0 && !initialLoading && (
                    <div className="flex justify-center py-12">
                        <PulseLoader color="#000" size={4} />
                    </div>
                )}

                {!initialLoading && services?.length > 0 && hasMore && (
                    <div className="flex justify-self-center mt-8">
                        <button 
                            onClick={loadMoreServices}
                            disabled={loading}
                            className={`${formBtn3} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <PulseLoader color="#fff" size={4} />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                'Load More Services'
                            )}
                        </button>
                    </div>
                )}
            </section>
            <img
                src={corner1}
                alt="corner"
                className="absolute bottom-0 left-0 w-24 -rotate-90"
            />
            <img
                src={corner1}
                alt="corner"
                className="absolute bottom-0 right-0 w-24 rotate-180"
            />

        </section>
    );
}
