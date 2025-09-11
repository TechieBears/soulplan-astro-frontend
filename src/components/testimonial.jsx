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
      <section className="py-12 sm:py-20 bg-white">
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
            breakpoints={{
              768: { slidesPerView: 2, centeredSlides: true },
              1024: { slidesPerView: 3, centeredSlides: true },
            }}
            className="pb-10"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`p-6 rounded-xl shadow-md h-full flex flex-col items-center text-center transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-r rounded-2xl from-blue-500 via-purple-500 to-red-500 text-white scale-105 shadow-xl z-10"
                      : "bg-white border text-gray-700 scale-100 opacity-80"
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
                  <p className="text-sm sm:text-base mb-4">{t.text}</p>

                  {/* Stars */}
                  <div className="flex rounded-full justify-center mb-2">
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

      <section>
        <div className="w-full bg-[#fff6ef] px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-between gap-12">
            {/* Left Side - Text */}
            <div className="text-center md:text-left max-w-lg py-16 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Download Our Astrologer
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent">
                  App Today
                </span>
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-lg">
                For a seamless experience, download our apps on your phone
              </p>

              {/* Play Store Button */}
              <div className="mt-6 flex justify-center md:justify-start">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={playstore} alt="Google Play" className="h-14" />
                </a>
              </div>
            </div>

            {/* Right Side - Phone Mockup (bottom aligned, no padding) */}
            <div className="relative flex items-end justify-end flex-1">
              <img
                src={phoneMockup}
                alt="App Preview"
                className="w-60 md:w-72 lg:w-80 relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ffe9cc] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Small Heading */}
          <p className="text-sm font-semibold tracking-wide text-red-600 mb-2">
            DISCOVER YOUR SELF
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Explore a complete range of spiritual{" "}
            <br className="hidden sm:block" />
            and healing services.
          </h2>

          {/* Button */}
          <button className={`btn ${formBtn3}`}>
            Book Your Session
          </button>
        </div>
      </section>
      <section />
    </>
  );
};

export default Testimonials;
