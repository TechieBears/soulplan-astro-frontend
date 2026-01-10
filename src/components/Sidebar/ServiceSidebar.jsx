import { useEffect, useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import { Mobile } from "iconsax-reactjs";
import Breadcrumbs from "../../components/breadcrum";
import { CaretRight, ClockCountdown, Star } from "@phosphor-icons/react";
import { addRating, getPublicServicesDropdown, getPublicServicesSingle, getRatings } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import CustomTextArea from "../TextInput/CustomTextArea";
import { PulseLoader } from "react-spinners";
import moment from "moment";
import { formBtn3 } from "../../utils/CustomClass";
import maskHand from "../../assets/services/maskHand.png";
import moon from "../../assets/moon.png";
import { useCurrency } from "../../utils/useCurrency";
import { getYouTubeVideoId } from "../../utils/youtubeHelper";

const SidebarLayout = () => {
    const params = useLocation();
    const [singleService, setSingleService] = useState(null);
    const [services, setServices] = useState([]);
    const [activeId, setActiveId] = useState(
        params?.state?.serviceData?._id || null
    );
    const serviceName = params.pathname.split('/services/')[1];

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

            // If navigating with service name, find and set the activeId
            if (serviceName && response?.data) {
                const foundService = response.data.find(service => service.name === decodeURIComponent(serviceName));
                if (foundService) {
                    setActiveId(foundService._id);
                }
            }
        };
        fetchServiceCategories();
    }, [serviceName]);

    return (
        <div className="bg-[#EFF2FA] default-bg pt-10 lg:pt-16">
            <Breadcrumbs currentService={singleService?.name || params?.state?.serviceData?.name} />
            <div className="container mx-auto px-5 xl:px-0 flex flex-col-reverse lg:flex-row xl:py-10 space-y-5 lg:space-x-10">
                {/* Sidebar */}
                <SideBar
                    services={services}
                    active={activeId}
                    setActive={setActiveId}
                />

                {/* Main Content */}
                <MainSection content={singleService} active={activeId} />
            </div>
        </div>
    );
};

const SideBar = ({ services, active, setActive }) => {
    return (
        <aside className="w-full lg:w-1/4 space-y-2 pb-14 lg:pb-0 lg:h-auto overflow-y-auto scroll-hide">
            <ul className="">
                {services?.map((service) => (
                    <li key={service.name}>
                        <button
                            onClick={() => { setActive(service?._id); window.scrollTo(0, 0, { behavior: "smooth" }) }}
                            className={`w-full text-left px-4 py-4 transition-all duration-300 relative font-medium font-tbPop text-md ${active === service?._id
                                ? "text-p"
                                : "text-slate-700"
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
    const currencySymbol = useCurrency();
    const [ratings, setRatings] = useState(null);
    const [ratingsLoading, setRatingsLoading] = useState(false);
    const login = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userDetails);
    const currencyType = useSelector((state) => state.user.userDetails?.currencyType);



    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            rating: 0,
            reviewText: "",
        }
    });

    const fetchRatings = async () => {
        try {
            setRatingsLoading(true);
            const res = await getRatings({ service: content?._id });
            setRatings(res?.data);
        } catch (err) {
            console.log("==========err in fetchRatings", err);
            setRatings([]);
        } finally {
            setRatingsLoading(false);
        }
    };


    const handleAddRating = async (data) => {
        console.log("⚡️🤯 ~ ProductDetail.jsx:111 ~ handleAddRating ~ data:", data)
        if (data?.rating === 0) {
            toast.error("Please select a rating");
            return;
        }
        try {
            const payload = {
                user_id: user?._id,
                service_id: content?._id,
                product_id: null,
                message: data?.reviewText,
                rating: data?.rating
            }
            await addRating(payload).then(res => {
                if (res?.success) {
                    toast.success("Review Added Successfully");
                    fetchRatings();
                    reset();
                } else {
                    toast.error(res?.message || "Something went wrong");
                }
            })
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error("Failed to add Review");
        }
    }
    useEffect(() => {
        fetchRatings();
    }, [content?._id]);



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
        <main className="flex-1 !my-0 relative">
            <img src={maskHand} alt="decoration" className="absolute -right-5 md:-right-10 lg:-right-16 xl:-right-20 top-[300px] w-20 sm:w-24 md:w-26 lg:w-28 h-auto object-contain pointer-events-none scale-x-[-1] z-0" />
            <div className="space-y-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-stretch">
                    <div className="w-full md:w-[230px] lg:w-[280px] xl:w-[320px] flex-shrink-0">
                        <img
                            src={content.image}
                            alt={content.title}
                            className="w-full h-full min-h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="bg-[#FFF2DB] service-detail-bg rounded-lg shadow-lg p-6 flex-1 max-w-lg space-y-3 relative overflow-hidden">
                        <h3 className="text-xl font-medium text-p font-tbLex relative z-10">
                            {content.title}
                        </h3>
                        <p className="text-gray-600 font-tbPop font-normal text-md relative z-10">
                            {content.subTitle}
                        </p>
                        <div className="space-y-3 py-3">
                            <div className="flex items-center gap-2">
                                <h4 className="text-slate-700 text-lg font-tbPop font-semibold">
                                    Price: {currencySymbol} {currencyType === "INR" ? content.price : content.usdPrice}
                                </h4>
                            </div>
                            <div className="space-x-1.5 flex items-center">
                                <ClockCountdown size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">
                                    Session Duration: {content.durationInMinutes} minutes
                                </h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mobile size={20} className="flex-shrink-0" />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">Mode:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {content?.serviceType?.map((mode, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 text-xs font-tbPop font-medium capitalize bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full"
                                        >
                                            {mode === 'online' ? 'Online' : mode === 'face_to_face' ? 'Face to Face' : mode}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <GradientButton
                                className="w-full"
                                onClick={() => {
                                    navigate("/booking", { state: { service: content } }),
                                        window.scrollTo(0, 0, { behavior: "smooth" });
                                }}
                            >
                                Check Availability
                            </GradientButton>
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
                    {content.videoUrl && content.videoUrl.length > 0 && (
                        <>
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
                                    const videoId = getYouTubeVideoId(url);
                                    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

                                    return (
                                        <SwiperSlide key={vid._id || index}>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="w-full h-48 sm:h-56 md:h-72 lg:h-60 xl:h-64 bg-black mb-8 sm:mb-0 overflow-hidden">
                                                    {isYouTube && videoId ? (
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${videoId}`}
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
                        </>
                    )}
                </div>

                <div className="">
                    <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <h3 className="text-xl font-bold font-tbLex text-gray-900">
                                Customer Reviews
                            </h3>
                        </div>

                        {/* Sample Reviews */}
                        {ratingsLoading ? <div className="flex justify-center items-center h-40 gap-2"><span className="font-tbPop text-gray-600">Loading</span><PulseLoader color="#000" size={4} /></div> :
                            ratings?.length > 0 ?
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    {ratings?.map((review) => (
                                        <div
                                            key={review?._id}
                                            className="bg-white p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            size={18}
                                                            className={`${star <= review?.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                                }`}
                                                            weight={star <= review?.rating ? "fill" : "regular"}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-semibold font-tbPop capitalize text-gray-900">
                                                        {review?.user?.firstName || "Anonymous"} {review?.user?.lastName || "User"}
                                                    </span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-500 font-tbPop">
                                                        {moment(review?.createdAt).format("DD MMM YYYY")}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 font-tbPop text-sm leading-relaxed">
                                                {review?.message}
                                            </p>
                                        </div>
                                    ))}
                                </div> :
                                <div className="text-slate-500 font-tbPop text-base text-center py-20  rounded-lg">
                                    No reviews available
                                </div>}
                    </div>
                </div>
            </div>
        </main>
    );
};
export default SidebarLayout;
