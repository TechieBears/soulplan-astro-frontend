import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import playstore from "../../src/assets/google-play-black.png";
import phoneMockup from "../../src/assets/phone-mockup.png";
import { formBtn3 } from "../utils/CustomClass";
import { QuoteUp } from "iconsax-reactjs";
import handImage from '../assets/helperImages/handImage.png'
import { useNavigate } from "react-router-dom";

const testimonials = [
    {
        name: "Shilpa Handergule",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
    },
    {
        name: "Shilpa Handergule",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
    },
    {
        name: "Sonali Shinde",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        highlight: true, // This one gets the gradient background
    },
    {
        name: "Sumanth Shubash",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
    },
];

const Testimonials = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = React.useState(0);

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
                        <Swiper
                            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            modules={[Autoplay]}
                            spaceBetween={30}
                            centeredSlides={true}
                            loop={true}
                            rewind
                            className="pb-12 overflow-visible"
                            breakpoints={{
                                768: { slidesPerView: 2, centeredSlides: true },
                                1024: { slidesPerView: 3, centeredSlides: true },
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        >
                            {testimonials.map((t, index) => (
                                <SwiperSlide key={index} className="flex h-full">
                                    <div
                                        className={`w-full p-6 rounded-lg transition-colors duration-300 flex flex-col items-center justify-between text-center shadow-md min-h-[320px] ${activeIndex === index
                                            ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white scale-105 shadow-xl z-10"
                                            : "bg-white border text-gray-700 opacity-80"
                                            }`}
                                    >
                                        {/* Quote Icon */}
                                        <QuoteUp className={`absolute z-10 top-5 left-5  transition-all duration-300 ${activeIndex === index ? "text-white" : "text-slate-200"}`} size={70} variant="Bold" />

                                        {/* Avatar */}
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-20 h-20 rounded-full border-2 border-white mb-4"
                                        />

                                        {/* Testimonial Text */}
                                        <p className="text-sm mb-4 leading-relaxed font-tbPop !font-normal line-clamp-3">
                                            {t.text}
                                        </p>

                                        {/* Stars */}
                                        <div className="flex justify-center space-x-1">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <span key={i} className="text-yellow-400 text-xl">
                                                    ★
                                                </span>
                                            ))}
                                        </div>

                                        {/* Name */}
                                        <h4
                                            className={`font-normal tracking-tight capitalize font-tbLex line-clamp-1 ${activeIndex === index ? "text-white" : "text-gray-700"
                                                }`}
                                        >
                                            {t.name}
                                        </h4>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            <section className="bg-[#fff6ef]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between pt-16 md:pt-20 gap-10 xl:gap-10 px-5 xl:px-0">
                    <div className="text-left flex flex-col justify-center items-center md:items-start space-y-3">
                        <h2 className="text-xl md:text-2xl xl:text-4xl font-bold text-p text-center md:text-left">
                            Download Our Astrologer <br /> App Today
                        </h2>
                        <p className="text-gray-600 text-sm lg:text-base text-center md:text-left">
                            For a sameless experience, download our apps <br /> on your phone
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
                            className="w-full h-full relative z-10"
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
