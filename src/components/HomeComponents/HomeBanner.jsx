import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import { formBtn3 } from '../../utils/CustomClass';
import roundimage from '../../assets/roundimage.png';

const HomeBanner = ({ slidesData }) => {
    return (
        <section className='w-full h-screen'>
            <Swiper
                slidesPerView={1}
                freeMode={true}
                modules={[FreeMode, Autoplay, Navigation]}
                navigation={true}
                centeredSlides={true}
                className="mySwiper homeBannerSwiper"
            >
                {slidesData?.map((slide, index) => {
                    return (
                        <SwiperSlide key={index} className='relative '>
                            <div className="relative h-screen w-full">
                                <div className="absolute inset-0 z-20 flex justify-center items-center bg-black/70"></div>
                                <img
                                    loading="lazy"
                                    src={slide.image}
                                    className="w-full flex-shrink-0 h-screen object-cover cursor-pointer object-center"
                                    alt={slide.title || 'Slide Image'}
                                />
                                <div className="absolute inset-0 container mx-auto flex  items-center justify-between z-30 px-5 xl:pl-0 pr-10 xl:pr-0">
                                    <div className="w-full md:w-2/3 lg:w-1/2 space-y-3 lg:space-y-5 text-center md:text-left">
                                        <h1 className="text-3xl lg:text-4xl xl:text-6xl pb-2 font-tbLex font-bold text-p tracking-tighter">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xs md:text-sm font-tbPop w-full md:w-2/3  text-slate-200 pb-1 text-center md:text-left">
                                            {slide.description}
                                        </p>
                                        {slide.button && (
                                            <div className="flex justify-center md:justify-start">
                                                <button
                                                    className={`btn ${formBtn3} !w-fit`}
                                                    onClick={slide.onClick}
                                                >
                                                    <span className="text-white">Book an Appointment</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {index == 0 && (
                                        <div className="w-1/3  justify-center items-center overflow-hidden scale-[1.15] imageback hidden md:block">
                                            <img
                                                src={roundimage}
                                                alt={slide.title}
                                                className="w-full h-full object-contain  spin-slow"
                                            />
                                        </div>
                                    )}


                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}
export default HomeBanner;
