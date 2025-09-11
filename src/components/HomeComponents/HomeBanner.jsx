import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formBtn2 } from "../../utils/CustomClass";
import { environment } from "../../env"; // contains imageBaseUrl

const HomeBanner = ({ slidesData }) => {
  // Only log the raw backend data (slidesData)
  useEffect(() => {
    console.log('Backend banner data:', slidesData);
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
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  const goToSlide = (index) => setCurrentSlide(index);

  if (!slidesData || slidesData.length === 0) {
    return <div className="text-center mt-20">No slides available</div>;
  }

  return (
    <div className=" relative">
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
                  <div className="absolute  inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
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
                <div className="absolute inset-0 flex justify-center items-center flex-col space-y-3 container mx-auto z-30 px-4 md:px-8" style={{textAlign: 'center'}}>
                  <h1 className="split text-2xl md:text-4xl lg:text-6xl pb-2 font-tbLex font-bold text-neutral-50">
                    {slide.title}
                  </h1>
                  <p className="discrption text-xs md:text-base font-tbPop font-normal text-white max-w-4xl mb-5">
                    {slide.description}
                  </p>
                  {slide.button && (
                    <button
                      className={`btn${formBtn2}`}
                      onClick={slide.onClick}
                    >
                      {slide.button}
                    </button>
                  )}
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

          {/* Indicators */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-50">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-orange-400 scale-125 shadow-lg"
                    : "bg-white bg-opacity-60 hover:bg-orange-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBanner;
