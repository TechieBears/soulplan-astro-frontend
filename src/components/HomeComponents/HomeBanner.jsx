import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formBtn3 } from "../../utils/CustomClass";
import { environment } from "../../env"; // contains imageBaseUrl

// Spinner image (you can replace with your own)
import spinnerImg from "../../assets/signs.png";

const HomeBanner = ({ slidesData }) => {
  useEffect(() => {
    console.log("Backend banner data:", slidesData);
  }, [slidesData]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play
  useEffect(() => {
    let interval;
    if (isAutoPlay && slidesData && slidesData.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, slidesData]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );

  const goToSlide = (index) => setCurrentSlide(index);

  if (!slidesData || slidesData.length === 0) {
    return <div className="text-center mt-20">No slides available</div>;
  }

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="relative justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesData.map((slide) => (
            <div key={slide.id} className="min-w-full flex-shrink-0">
              <section className="relative flex h-[100vh] md:h-screen items-center justify-center overflow-hidden">
                {/* Background Gradient Overlay */}
                {slide.background && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                )}

                {/* Image */}
                {slide.image && (
                  <img
                    src={slide.image}
                    alt="Home Banner"
                    className="absolute w-full h-full object-cover"
                  />
                )}

                {/* Video */}
                {slide.video && (
                  <video
                    src={slide.video}
                    className="absolute w-full h-full object-cover"
                    loop
                    autoPlay
                    playsInline
                    muted
                  />
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 z-20 bg-black/40"></div>

                {/* Content */}
                <div className="absolute inset-0 flex justify-center items-center flex-col space-y-3 container mx-auto z-30 px-4 md:px-8 text-center">
                  <h1 className="split text-2xl md:text-4xl lg:text-6xl pb-2 font-tbLex font-bold text-neutral-50">
                    {slide.title}
                  </h1>
                  <p className="discrption text-xs md:text-base font-tbPop font-normal text-white max-w-4xl mb-5">
                    {slide.description}
                  </p>
                  {slide.button && (
                    <button
                      className={`btn${formBtn3}`}
                      onClick={slide.onClick}
                    >
                      <span className="text-white">Button</span>
                    </button>
                  )}
                </div>

                {/* 🔥 Right Side Spinner */}
                <div className="absolute width right-10 top-1/2 -translate-y-1/2 z-30 hidden md:block">
                  <img
                    src={spinnerImg}
                    alt="Spinner"
                    className="w-64 h-64 animate-spin object-contain" // ⬅️ bigger size
                    style={{ animationDuration: "10s" }} // slower spin
                  />
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {slidesData.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 group shadow-lg z-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 group shadow-lg z-50"
            aria-label="Next slide"
          >
          <ChevronRight className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>

         
        </>
      )}
    </div>
  );
};

export default HomeBanner;
