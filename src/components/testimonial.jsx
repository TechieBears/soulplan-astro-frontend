import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import playstore from "../../src/assets/google-play-black.png";
import phoneMockup from "../../src/assets/phone-mockup.png";
import { formBtn3 } from "../utils/CustomClass";
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
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
              What Our Clients Are Saying
            </span>
          </h2>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
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
                  className={`w-full p-6 rounded-2xl transition-all duration-300 flex flex-col items-center justify-between text-center shadow-md min-h-[320px] ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white scale-105 shadow-xl z-10"
                      : "bg-white border text-gray-700 opacity-80"
                  }`}
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-3xl opacity-30 mb-4" />

                  {/* Avatar */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full border-4 border-white mb-4"
                  />

                  {/* Testimonial Text */}
                  <p className="text-sm sm:text-base mb-4 flex-grow">
                    {t.text}
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <h4
                    className={`font-semibold ${
                      activeIndex === index ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {t.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="bg-[#fff6ef]">
        <div className="w-full px-6 md:px-16 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {[{
              title1: "Download Our Astrologer",
              title2: "App Today",
              desc: "For a seamless experience, download our apps on your phone",
              playstore,
              phoneMockup
            }].map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Left Side - Text */}
                <div className="text-left max-w-lg flex flex-col justify-center">
                  <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                    <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                      {item.title1}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent">
                      {item.title2}
                    </span>
                  </h2>
                  <p className="text-gray-600 mt-4 text-base md:text-lg">
                    {item.desc}
                  </p>
                  <div className="mt-6 flex justify-start">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img src={item.playstore} alt="Google Play" className="h-14" />
                    </a>
                  </div>
                </div>
                {/* Right Side - Phone Mockup (always visible) */}
                <div className="relative flex items-end justify-end w-full min-h-[300px]">
                  <img
                    src={item.phoneMockup}
                    alt="App Preview"
                    className="w-72 sm:w-96 md:w-[28rem] lg:w-[32rem] relative z-10"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ffe9cc] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Small Heading */}
          <p className="text-p font-semibold tracking-wide mb-2">
            DISCOVER YOUR SELF
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Explore a complete range of spiritual{" "}
            <br className="hidden sm:block" />
            and healing services.
          </h2>

          {/* Button */}
          <button className={`btn justify-self-center ${formBtn3}`}>Book Your Session</button>
        </div>
      </section>
      <section />
    </>
  );
};

export default Testimonials;
