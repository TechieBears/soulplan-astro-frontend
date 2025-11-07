import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import playstore from "../../src/assets/google-play-black.png";
import phoneMockup from "../../src/assets/phone-mockup.png";
import { formBtn3 } from "../utils/CustomClass";
import handImage from "../assets/helperImages/handImage.png";
import { useNavigate } from "react-router-dom";
import { getAllPublicTestimonials } from "../api";
import userImage from "../assets/user.webp";
import underline from "../assets/undertext.png";
import TestimonialModal from "./Modals/TestimonialModal";

const Testimonials = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const response = await getAllPublicTestimonials(1, 10);
                if (response?.success && response?.data) {
                    setTestimonials(response.data);
                } else {
                    setTestimonials([]);
                }
            } catch (error) {
                console.log("error", error);
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <>
            <section className="py-16 bg-white relative">
                <div className="absolute top-10 left-0 ">
                    <img src={handImage} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="absolute bottom-10 right-0 image-flip">
                    <img src={handImage} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="container mx-auto px-8 md:px-6 xl:px-0 text-center space-y-6 xl:space-y-10">
                    {/* Title */}
                    <>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                            <span className="text-p">
                                See What Our Happy Customers Are Saying!
                            </span>
                        </h2>
                        <img
                            src={underline}
                            alt="Underline"
                            className="w-40 md:w-56 h-auto  mx-auto object-contain"
                        />
                    </>
                    {/* Swiper */}
                    <div className="pl-[2px] relative">
                        {loading ? (
                            <div className="flex justify-center items-center space-x-6 pb-12 ">
                                {[1, 2, 3]?.map((item) => (
                                    <div key={item} className="animate-pulse w-[400px]">
                                        <div className="w-full max-w-sm p-6 rounded-lg bg-slate-100 shadow-md min-h-[320px] flex flex-col items-center justify-between">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                                            <div className="space-y-2 w-full">
                                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                            </div>
                                            <div className="flex space-x-1 mt-4">
                                                {[1, 2, 3, 4, 5]?.map((star) => (
                                                    <div
                                                        key={star}
                                                        className="w-5 h-5 bg-gray-300 rounded"
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="h-6 bg-gray-300 rounded w-24 mt-2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : testimonials?.length > 0 ? (
                            <>
                            <Swiper
                                spaceBetween={20}
                                centeredSlides={false}
                                slidesPerView={1}
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                loop={true}
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {testimonials?.map((t, index) => (
                                    <SwiperSlide
                                        key={t._id || index}
                                        className="!flex !justify-center"
                                    >
                                        <div
                                            className={`w-full h-[400px] border-3 border-orange-500 bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between border hover:shadow-xl`}
                                        >
                                            {/* Card Header */}
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center space-x-3 my-2">
                                                    <img
                                                        src={
                                                            t?.user?.profileImage ||
                                                            t?.user_id?.profileImage ||
                                                            t?.user_id?.image ||
                                                            t?.image ||
                                                            userImage
                                                        }
                                                        alt={`${t?.user?.firstName || t?.user_id?.name || "User"
                                                            }'s testimonial`}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                                        onError={(e) => {
                                                            e.target.src = userImage;
                                                        }}
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 text-sm capitalize text-left">
                                                            {t?.user?.firstName && t?.user?.lastName
                                                                ? `${t.user.firstName} ${t.user.lastName}`
                                                                : t?.user_id?.name ||
                                                                t?.name ||
                                                                "Anonymous User"}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 text-left">
                                                            {[t?.city, t?.state, t?.country]
                                                                .filter(Boolean)
                                                                .join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-4 flex-1">
                                                {(t?.service || t?.product) && (
                                                    <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                                                        {t?.service?.name ||
                                                            t?.service?.title ||
                                                            t?.product?.name}
                                                    </div>
                                                )}

                                                <div className="text-gray-700 text-sm leading-relaxed mb-4 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                                    <p>
                                                        {t?.message || t?.text}
                                                    </p>
                                                </div>
                                            </div>

                                            {t?.media && t?.media?.length > 0 && (
                                                <div className="px-4 pb-4">
                                                    <img
                                                        src={t.media[0]}
                                                        alt="Testimonial media"
                                                        className="w-full h-32 object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev-custom absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 bg-black rounded-full shadow-lg p-2 cursor-pointer  transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <div className="swiper-button-next-custom absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 bg-black rounded-full shadow-lg p-2 cursor-pointer transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No testimonials available at the moment.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-100">
                <div className="container mx-auto text-center py-20 space-y-6">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                            <span className="text-p capitalize">
                                Share your experience with us
                            </span>
                        </h2>
                        <p className="text-black text-sm lg:text-base text-center mb-2 max-w-2xl mx-auto">
                            "We’d love to know how your experience was! Your feedback helps us
                            understand what we’re doing right and where we can improve to
                            serve you even better."
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <TestimonialModal />
                    </div>
                </div>
            </section>

            <section className="bg-[#FFEED3]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between pt-16 md:pt-20 gap-10 xl:gap-10 px-5 xl:px-0">
                    <div className="text-left flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-xl md:text-2xl xl:text-5xl w-full font-bold font-tbPop text-black text-center md:text-left pb-3">
                            Download Our <span className="text-p">"Soul Plan"</span> App Today
                        </h2>
                        <p className="text-gray-600 text-sm lg:text-base text-center md:text-left mb-2">
                            For a sameless experience, download our apps on your phone
                        </p>
                        <div className="flex justify-start pt-4">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={playstore}
                                    alt="Google Play"
                                    className="h-10 lg:h-14"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="relative flex items-end justify-end w-full h-full">
                        <img
                            src={phoneMockup}
                            alt="App Preview"
                            className="w-full h-[30rem] relative z-10 object-contain "
                        />
                    </div>
                </div>
            </section>

            <section className="bg-neutral-100">
                <div className="container mx-auto text-center py-20 space-y-6">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                            <span className="text-p capitalize">Contact Us Today</span>
                        </h2>
                        <p className="text-black text-sm lg:text-base text-center mb-2 max-w-2xl mx-auto">
                            We are here to help you with any questions or concerns you may
                            have. <br />
                            Click the button below to contact us.
                        </p>
                    </div>
                    <button
                        className={`btn justify-self-center ${formBtn3} !w-fit`}
                        onClick={() => {
                            navigate("/contact"),
                                window.scrollTo(0, 0, { behavior: "smooth" });
                        }}
                    >
                        Contact Now
                    </button>
                </div>
            </section>
            <section />
        </>
    );
};

export default Testimonials;
