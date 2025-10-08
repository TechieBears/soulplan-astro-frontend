import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import playstore from "../../src/assets/google-play-black.png";
import phoneMockup from "../../src/assets/phone-mockup.png";
import { formBtn3 } from "../utils/CustomClass";
import { QuoteUp } from "iconsax-reactjs";
import handImage from '../assets/helperImages/handImage.png'
import { useNavigate } from "react-router-dom";
import { getAllPublicTestimonials } from "../api";
import userImage from '../assets/user.webp';
import { Star } from "@phosphor-icons/react";


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
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug text-p">
                        What Our Clients Are Saying
                    </h2>
                    {/* Swiper */}
                    <div className="">
                        {loading ? (
                            <div className="flex justify-center items-center space-x-6 pb-12">
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
                                                    <div key={star} className="w-5 h-5 bg-gray-300 rounded"></div>
                                                ))}
                                            </div>
                                            <div className="h-6 bg-gray-300 rounded w-24 mt-2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : testimonials?.length > 0 ? (
                            <Swiper
                                autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                modules={[Autoplay]}
                                spaceBetween={30}
                                centeredSlides={true}
                                loop={testimonials?.length > 1}
                                rewind
                                className="pb-12 overflow-visible"
                                breakpoints={{
                                    768: { slidesPerView: 2, centeredSlides: true },
                                    1024: { slidesPerView: 3, centeredSlides: true },
                                }}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {testimonials?.map((t, index) => (
                                    <SwiperSlide key={t._id || index} className="flex h-full">
                                        <div
                                            className={`w-full p-6 rounded-lg transition-colors duration-300 flex flex-col items-center justify-between text-center shadow-md min-h-[320px] ${activeIndex === index
                                                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white scale-105 shadow-xl z-10"
                                                : "bg-white border text-gray-700 opacity-80"
                                                }`}
                                        >
                                            {/* Quote Icon */}
                                            <QuoteUp className={`absolute z-10 top-5 left-5 transition-all duration-300 ${activeIndex === index ? "text-white" : "text-slate-200"}`} size={70} variant="Bold" />

                                            {/* Avatar */}
                                            <img
                                                src={t?.user_id?.profileImage || t?.user_id?.image || t?.image || userImage}
                                                alt={`${t?.user_id?.profile?.firstName || t?.user_id?.name || t?.name || "User"}'s testimonial`}
                                                className="w-20 h-20 rounded-full border-2 border-white mb-4 object-cover"
                                                onError={(e) => {
                                                    e.target.src = userImage;
                                                }}
                                            />

                                            {/* Testimonial Text */}
                                            <p className="text-sm mb-4 leading-relaxed font-tbPop !font-normal line-clamp-3">
                                                {t?.message || t?.text}
                                            </p>

                                            {/* Stars */}
                                            <div className="flex justify-center space-x-1">
                                                {Array.from({ length: t.rating || 5 }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={20}
                                                        weight="fill"
                                                        color={index < t.rating ? "#FFD700" : "#E5E7EB"}
                                                    />
                                                ))}
                                            </div>

                                            {/* Name */}
                                            <h4
                                                className={`font-normal tracking-tight capitalize font-tbLex line-clamp-1 ${activeIndex === index ? "text-white" : "text-gray-700"
                                                    }`}
                                            >
                                                {t?.user_id?.profile?.firstName && t?.user_id?.profile?.lastName
                                                    ? `${t.user_id.profile.firstName} ${t.user_id.profile.lastName}`
                                                    : t?.user_id?.name || t?.name || "Anonymous User"}
                                            </h4>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-[#fff6ef]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between pt-16 md:pt-20 gap-10 xl:gap-10 px-5 xl:px-0">
                    <div className="text-left flex flex-col justify-center items-center md:items-start space-y-3">
                        <h2 className="text-xl md:text-2xl xl:text-5xl w-full font-bold font-tbPop text-p text-center md:text-left ">
                            “Astrology, Reimagined for Your Soul”
                        </h2>
                        <p className="text-gray-600 text-sm lg:text-base text-center md:text-left">
                            Download Our App Today
                        </p>
                        <div className="flex justify-start">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={playstore} alt="Google Play" className="h-10 lg:h-14" />
                            </a>
                        </div>
                    </div>
                    <div className="relative flex items-end justify-end w-full h-full">
                        <img
                            src={phoneMockup}
                            alt="App Preview"
                            className="w-full h-[30rem] relative z-10 object-contain"
                        />
                    </div>
                </div>
            </section >

            <section className="bg-[#FFEED3]">
                <div className="container mx-auto text-center py-20 space-y-2">
                    <p className="text-p text-sm md:text-base font-tbLex tracking-tight">
                        DISCOVER YOUR SELF
                    </p>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-black pb-5">
                        Explore a complete range of spiritual{" "}
                        <br className="hidden sm:block" />
                        and healing services.
                    </h2>
                    <button className={`btn justify-self-center ${formBtn3} !w-fit`} onClick={() => { navigate('/services'), window.scrollTo(0, 0, { behavior: 'smooth' }) }}>Book Your Session</button>
                </div>
            </section>
            <section />
        </>
    );
};

export default Testimonials;
