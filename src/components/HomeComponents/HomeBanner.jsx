import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import GradientButton from '../Buttons/GradientButton';
import roundimage from '../../assets/roundimage.png';
import Preloaders from '../Loader/Preloaders';

const HomeBanner = ({ slidesData, isLoading }) => {
    if (isLoading) {
        return (
            <section className='w-screen h-screen bg-[#FFF9EF]'>
                <Preloaders />
            </section>
        );
    }

    if (!slidesData || slidesData.length === 0) {
        return (
            <section className='w-full h-screen bg-[#FFF9EF] flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-tbLex font-bold text-gray-600 mb-2'>No Banners Available</h2>
                    <p className='text-gray-500 font-tbPop'>Please check back later for updates.</p>
                </div>
            </section>
        );
    }

    return (
        <section className='w-full relative'>
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
                        <SwiperSlide key={index} className='relative'>
                            <div className="relative w-full min-h-[700px] sm:min-h-[650px] md:min-h-[550px] lg:min-h-[700px] pt-16 md:pt-16 lg:pt-20">
                                <div className="absolute inset-0 z-10 bg-black/70"></div>
                                <img
                                    loading="lazy"
                                    src={slide.image}
                                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                                    alt={slide.title || 'Slide Image'}
                                />
                                <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start z-20 px-5 md:px-8 lg:px-12 xl:px-16 gap-6 md:gap-0 py-12 md:py-12 lg:py-14 h-full">
                                    <div className="w-3/4 sm:w-2/3 md:hidden flex justify-center items-center aspect-square relative">
                                        <div className="absolute inset-0 imageback"></div>
                                        <img
                                            src={roundimage}
                                            alt={slide.title}
                                            className="w-full h-full object-contain spin-slow relative z-10"
                                        />
                                    </div>
                                    <div className="hidden md:block md:w-1/3 md:order-2 aspect-square">
                                    </div>

                                    <div className="w-full md:w-2/3 lg:w-1/2 space-y-3 lg:space-y-5 text-center md:text-left md:order-1 md:pr-8">
                                        <h1 className="text-3xl lg:text-4xl xl:text-6xl pb-2 font-tbLex font-bold tracking-tighter banner-title" style={{ color: '#FFF2DB' }}>
                                            {slide.title}
                                        </h1>
                                        <p className="text-md md:text-md font-tbPop w-full md:w-2/3 text-slate-200 pb-1 text-center md:text-left banner-description">
                                            {slide.description}
                                        </p>
                                        {slide.button && (
                                            <div className="flex justify-center md:justify-start banner-button">
                                                <GradientButton
                                                    className="btn !w-64 !rounded-sm"
                                                    onClick={slide.onClick}
                                                >
                                                    Book an Appointment
                                                </GradientButton>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="hidden md:block absolute top-1/2 right-[2%] md:right-[3%] lg:right-[5%] -translate-y-1/2 md:mt-8 lg:mt-10 w-[380px] md:w-[420px] lg:w-[480px] xl:w-[520px] aspect-square z-30 pointer-events-none imageback">
                <img
                    src={roundimage}
                    alt="Decorative element"
                    className="w-full h-full object-contain spin-slow"
                />
            </div>
        </section>
    )
}
export default HomeBanner;
