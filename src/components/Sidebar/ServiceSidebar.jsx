import { useEffect, useState } from "react";
import { formBtn3 } from "../../utils/CustomClass";
import { Mobile } from "iconsax-reactjs";
import Breadcrumbs from "../../components/breadcrum";
import { CaretRight, ClockCountdown } from "@phosphor-icons/react";
import { getPublicServicesDropdown, getPublicServicesSingle } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

const SidebarLayout = () => {
    const params = useLocation();
    const [singleService, setSingleService] = useState(null);
    const [services, setServices] = useState([]);
    const [activeId, setActiveId] = useState(params?.state?.serviceData?._id || null);

    useEffect(() => {
        const fetchService = async () => {
            const response = await getPublicServicesSingle({ id: activeId });
            setSingleService(response?.data);
        };
        fetchService();
    }, [activeId]);

    useEffect(() => {
        const fetchServiceCategories = async () => {
            const response = await getPublicServicesDropdown();
            setServices(response?.data);
        }
        fetchServiceCategories();
    }, []);

    return (
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16">
            <Breadcrumbs currentService={params?.state?.serviceData?.name} />
            <div className="container mx-auto px-5 xl:px-0 flex flex-col-reverse lg:flex-row xl:py-10 space-y-5 lg:space-x-10">
                {/* Sidebar */}
                <SideBar services={services} active={activeId} setActive={setActiveId} />

                {/* Main Content */}
                <MainSection content={singleService} active={activeId} />
            </div>
        </div>
    );
};

const SideBar = ({ services, active, setActive }) => {
    return (
        <aside className="w-full lg:w-1/4 space-y-2 pb-14 lg:pb-0 h-screen overflow-y-scroll ">
            <ul className="">
                {services?.map((service) => (
                    <li key={service.name}>
                        <button
                            onClick={() => setActive(service?._id)}
                            className={`w-full text-left px-4 py-4 transition-all duration-300 relative font-medium font-tbPop text-md ${active === service?._id
                                ? "text-p bg-[#ffecd2]"
                                : "hover:bg-[#ffecd2]/50 text-slate-700"
                                }`}
                        >
                            <div className="flex items-center justify-between overflow-hidden text-nowrap">
                                <span className="text-ellipsis overflow-hidden">
                                    {service.name}
                                </span>
                                <span className="text-p">
                                    <CaretRight size={20} className="text-black" />
                                </span>
                            </div>
                            {active === service?._id ? (
                                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-gradient rounded-3xl transition-colors duration-300" />
                            ) : (
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-200 rounded-full" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const MainSection = ({ content }) => {
    const navigate = useNavigate();

    if (!content) {
        return (
            <main className="flex-1 !my-0 ">
                <div className="space-y-8 flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading service details...</p>
                </div>
            </main>
        );
    }

    // Function to strip HTML tags from content
    const stripHtmlTags = (html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };

    return (
        <main className="flex-1 !my-0 ">
            <div className="space-y-8">
                <img
                    src={content.image}
                    alt={content.title}
                    className="w-full sm:h-[60vh] object-cover rounded-md"
                />

                <div className="bg-[#FFF2DB] p-6 rounded-md space-y-3 ">
                    <h3 className="text-xl font-medium text-p font-tbLex">
                        {content.title}
                    </h3>
                    <p className="text-gray-600 font-tbPop font-normal text-md">
                        {content.subTitle}
                    </p>
                    <div className="flex justify-start  lg:justify-between  flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 py-3">
                        <div className="space-y-3">
                            <div className="space-x-1.5 flex items-center">
                                <ClockCountdown size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">
                                    Session Duration: {content.durationInMinutes} minutes
                                </h4>
                            </div>
                            <div className="space-x-1.5 flex items-center">
                                <Mobile size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal capitalize">
                                    Mode: {content.serviceType?.replaceAll("_", " ")}
                                </h4>
                            </div>
                        </div>
                        <div className="flex flex-col items-start lg:items-end space-y-2">
                            <button
                                className={`${formBtn3} lg:!w-auto`}
                                onClick={() => { navigate("/booking", { state: { service: content } }), window.scrollTo(0, 0, { behavior: "smooth" }) }}
                            >
                                Check Availability
                            </button>
                        </div>
                    </div>
                </div>

                <div className="prose max-w-none">
                    <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                    />
                </div>

                <div className="mt-10 w-full max-w-5xl mx-auto relative">
                    {/* Custom Navigation Buttons */}
                    <button
                        className="absolute top-1/2 left-2 sm:left-[-20px] md:left-[-40px] z-20 -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
                        id="prevBtn"
                    >
                        <ArrowLeft2 size={20} />
                    </button>
                    <button
                        className="absolute top-1/2 right-2 sm:right-[-20px] md:right-[-40px] z-20 -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
                        id="nextBtn"
                    >
                        <ArrowRight2 size={20} />
                    </button>

                    {content.videoUrl && content.videoUrl.length > 0 && (
                        <Swiper
                            slidesPerView={1} // default for mobile
                            spaceBetween={10}
                            keyboard={true}
                            modules={[Navigation, Keyboard]}
                            navigation={{
                                prevEl: "#prevBtn",
                                nextEl: "#nextBtn",
                            }}
                            className="sliderBox"
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 10 },
                                480: { slidesPerView: 1, spaceBetween: 10 },
                                640: { slidesPerView: 1, spaceBetween: 10 },
                                768: { slidesPerView: 2, spaceBetween: 15 },
                                1024: { slidesPerView: 3, spaceBetween: 20 },
                                1280: { slidesPerView: 3, spaceBetween: 25 },
                            }}
                        >
                            {content.videoUrl.map((vid, index) => {
                                const url = vid.videoUrl;

                                return (
                                    <SwiperSlide key={vid._id || index}>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="w-full h-48 sm:h-56 md:h-72 lg:h-60 xl:h-64 bg-black mb-8 sm:mb-0 overflow-hidden">
                                                {url.includes("youtube.com") ||
                                                    url.includes("youtu.be") ? (
                                                    <iframe
                                                        src={
                                                            url
                                                                .replace("watch?v=", "embed/")
                                                                .replace("youtu.be/", "www.youtube.com/embed/")
                                                                .split("&")[0]
                                                        }
                                                        title={`YouTube video ${index + 1}`}
                                                        className="w-full h-full"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <video
                                                        loop
                                                        muted
                                                        controls
                                                        playsInline
                                                        className="w-full h-full object-cover"
                                                    >
                                                        <source src={url} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    )}
                </div>
            </div>
        </main>
    );
};
export default SidebarLayout;
