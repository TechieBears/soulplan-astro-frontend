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
        <div className="bg-[#EFF2FA]  pt-10 lg:pt-16">
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
        <aside className="w-full lg:w-1/4 space-y-2 pb-14 lg:pb-0 h-screen overflow-y-scroll scroll-hide">
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
    const [ratings, setRatings] = useState(null);
    const [ratingsLoading, setRatingsLoading] = useState(false);
    const login = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userDetails);



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
        <main className="flex-1 !my-0 ">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-stretch">
                    <div className="w-full md:w-[230px] lg:w-[280px] xl:w-[320px] flex-shrink-0">
                        <img
                            src={content.image}
                            alt={content.title}
                            className="w-full h-full min-h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="bg-[#FFF2DB] rounded-lg shadow-lg p-6 flex-1 space-y-3">
                        <h3 className="text-xl font-medium text-p font-tbLex">
                            {content.title}
                        </h3>
                        <p className="text-gray-600 font-tbPop font-normal text-md">
                            {content.subTitle}
                        </p>
                        <div className="space-y-3 py-3">
                            <div className="space-x-1.5 flex items-center">
                                <ClockCountdown size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">
                                    Session Duration: {content.durationInMinutes} minutes
                                </h4>
                            </div>
                            <div className="space-x-1.5 flex items-center">
                                <Mobile size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal capitalize">
                                    Mode: {content?.serviceType?.map((skill, index) => (
                                        <span key={index} className="px-2 py-1 text-sm font-tbPop capitalize">
                                            {skill}
                                        </span>
                                    ))}
                                </h4>
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
                                                                    .replace(
                                                                        "youtu.be/",
                                                                        "www.youtube.com/embed/"
                                                                    )
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
                        </>
                    )}
                </div>

                <div className="">
                    {
                        login ? (
                            <form onSubmit={handleSubmit(handleAddRating)}>
                                <div className="mt-3 flex flex-col gap-3  rounded-lg">
                                    <h4 className="font-semibold text-gray-800 font-tbPop">Write a Review</h4>

                                    <div className="flex flex-col gap-2">
                                        <Controller
                                            name="rating"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => field.onChange(star)}
                                                            className="focus:outline-none"
                                                        >
                                                            <Star
                                                                className={`w-6 h-6 ${star <= field.value
                                                                    ? "text-yellow-400 fill-current"
                                                                    : "text-gray-300"
                                                                    } hover:text-yellow-400 transition-colors`}

                                                                weight={star <= field.value ? "fill" : "regular"}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700 font-tbPop">Review</label>
                                        <Controller
                                            name="reviewText"
                                            control={control}
                                            rules={{ required: "Please write a review" }}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <CustomTextArea
                                                        placeholder="Write your review here..."
                                                        props={{
                                                            ...field,
                                                            rows: 3,
                                                        }}
                                                        style="font-tbPop"
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-xs mt-1 font-tbPop">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                reset();
                                            }}
                                            className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition font-tbPop"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-3 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition font-tbPop"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Add review
                                    </h3>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className={`${formBtn3} !w-auto py-1 `}
                                    >
                                        Login to Review
                                    </button>
                                </div>
                            </div>
                        )
                    }


                    <div className="space-y-6 mt-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold font-tbPop text-black">
                                Customer Reviews
                            </h3>
                        </div>

                        {/* Sample Reviews */}
                        {ratingsLoading ? <div className="flex justify-center items-center h-40"> Loading<PulseLoader color="#000" size={4} /></div> :
                            ratings?.length > 0 ?
                                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                    {ratings?.map((review) => (
                                        <div
                                            key={review?._id}
                                            className="border-b border-gray-100 pb-4"
                                        >
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            size={16}
                                                            className={`${star <= review?.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                                } hover:text-yellow-400 transition-colors`}
                                                            weight={star <= review?.rating ? "fill" : "regular"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="font-medium font-tbPop capitalize text-sm ">
                                                    {review?.user?.firstName || "----- ----- "} {review?.user?.lastName || "----- ----- "}
                                                </span>
                                                <span className="text-sm text-gray-500 capitalize">
                                                    • {moment(review?.createdAt).format("DD MMM YYYY")}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 font-tbPop text-sm">
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
