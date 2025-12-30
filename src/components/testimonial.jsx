import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaStar } from 'react-icons/fa';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getAllPublicTestimonials } from "../api";
import userImage from "../assets/user.webp";
import underline from "../assets/undertext.png";
import vectorImg from "../assets/Vector.png";
import hand from "../assets/helperImages/handImage.png";
import TestimonialModal from "./Modals/TestimonialModal";

const NavButton = ({ onClick, direction, className = "" }) => (
    <button type="button" onClick={onClick} className={`bg-[#CAD5E2] hover:bg-[#b8c4d1] rounded-full flex items-center justify-center transition-colors duration-200 shadow-md ${className}`}>
        {direction === 'left' ? <CaretLeft size={className.includes('w-10') ? 20 : 24} className="text-black" weight="bold" /> : <CaretRight size={className.includes('w-10') ? 20 : 24} className="text-black" weight="bold" />}
    </button>
);

const StarRating = ({ rating = 5 }) => (
    <div className="flex justify-center items-center mb-2">
        <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    </div>
);

const TestimonialCard = ({ testimonial, isCenter }) => {
    const userName = testimonial?.user?.firstName && testimonial?.user?.lastName
        ? `${testimonial.user.firstName} ${testimonial.user.lastName}`
        : testimonial?.user_id?.name || testimonial?.name || "Anonymous User";
    const userImg = testimonial?.user?.profileImage || testimonial?.user_id?.profileImage || testimonial?.user_id?.image || testimonial?.image || userImage;

    return (
        <div className={`relative transition-all duration-700 ease-out ${isCenter ? 'scale-100 opacity-100 z-20 translate-x-0' : 'scale-90 opacity-40 z-10 hidden md:block'}`}>
            <img src={vectorImg} alt="quote" className="absolute top-6 left-6 w-[66px] h-[51px] z-10" />
            <div className={`w-80 sm:w-96 md:w-[28rem] h-auto min-h-[18rem] sm:min-h-[20rem] md:min-h-[24rem] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center ${isCenter ? 'bg-primary-gradient text-white shadow-lg' : 'bg-white text-gray-800 shadow-md'}`}>
                <div className="flex items-center justify-center mb-6">
                    <img src={userImg} alt={userName} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover" onError={(e) => e.target.src = userImage} />
                </div>
                <p className={`text-sm sm:text-base line-clamp-5 leading-tight mb-6 ${isCenter ? 'text-white' : 'text-gray-600'}`}>
                    "{testimonial?.message || testimonial?.text}"
                </p>
                <StarRating rating={testimonial?.rating} />
                <h4 className={`font-semibold text-sm sm:text-base ${isCenter ? 'text-white' : 'text-gray-800'}`}>{userName}</h4>
            </div>
        </div>
    );
};

const SectionHeader = ({ title, description }) => (
    <div className="text-center mb-6 md:mb-12 space-y-2 md:space-y-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug">
            <span className="text-p capitalize">{title}</span>
        </h2>
        <p className="text-black text-sm lg:text-base text-center mb-2 max-w-2xl mx-auto px-4">{description}</p>
    </div>
);

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState('next');

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getAllPublicTestimonials({ p: 1, records: 10 });
                setTestimonials(response?.success && response?.data ? response.data : []);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const handlePrev = useCallback(() => {
        setDirection('prev');
        setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    }, [testimonials.length]);
    const handleNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex(prev => prev >= testimonials.length - 1 ? 0 : prev + 1);
    }, [testimonials.length]);

    const visibleTestimonials = useMemo(() => {
        if (testimonials.length === 0) return [];
        return [
            ...(testimonials.length > 1 ? [{ index: (currentIndex - 1 + testimonials.length) % testimonials.length, isCenter: false }] : []),
            { index: currentIndex, isCenter: true },
            ...(testimonials.length > 2 ? [{ index: (currentIndex + 1) % testimonials.length, isCenter: false }] : [])
        ];
    }, [currentIndex, testimonials.length]);

    return (
        <>
            <section className="py-8 md:py-12 lg:py-16 bg-white relative">
                <div className="absolute top-24 left-0 scale-60 z-10">
                    <img src={hand} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="absolute bottom-5 right-0 scale-75 scale-x-[-1]">
                    <img src={hand} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug">
                            <span className="text-p">What Our Clients Are saying</span>
                        </h2>
                        <img src={underline} alt="Underline" className="w-32 sm:w-40 md:w-56 h-8 md:h-10 mt-2 md:mt-3 mx-auto" />
                    </div>

                    <div className="relative">
                        {testimonials.length > 1 && (
                            <>
                                <NavButton onClick={handlePrev} direction="left" className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12" />
                                <NavButton onClick={handleNext} direction="right" className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12" />
                            </>
                        )}

                        <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6 px-2 sm:px-4 md:px-8 lg:px-16">
                            {loading ? (
                                <div className="w-80 sm:w-96 md:w-[28rem] h-auto min-h-[18rem] sm:min-h-[20rem] md:min-h-[24rem] rounded-xl bg-gray-200 animate-pulse" />
                            ) : testimonials.length > 0 ? (
                                <div className="relative w-full flex items-center justify-center overflow-hidden">
                                    {visibleTestimonials.map(({ index, isCenter }, i) => {
                                        const position = i === 0 ? 'left' : i === 1 ? 'center' : 'right';
                                        const slideClass = direction === 'next' 
                                            ? 'animate-[slideInFromRight_0.5s_ease-out]' 
                                            : 'animate-[slideInFromLeft_0.5s_ease-out]';
                                        return (
                                            <div key={`${index}-${currentIndex}-${i}`} className={`${position !== 'center' ? 'absolute' : ''} ${position === 'left' ? '-left-[30%] md:-left-[35%]' : position === 'right' ? '-right-[30%] md:-right-[35%]' : ''} ${slideClass}`}>
                                                <TestimonialCard testimonial={testimonials[index]} isCenter={isCenter} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 md:py-12">
                                    <p className="text-gray-500 text-sm md:text-base">No testimonials available at the moment.</p>
                                </div>
                            )}
                        </div>

                        {testimonials.length > 1 && (
                            <div className="lg:hidden flex justify-center gap-3 mt-4 md:mt-6">
                                <NavButton onClick={handlePrev} direction="left" className="w-10 h-10" />
                                <NavButton onClick={handleNext} direction="right" className="w-10 h-10" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-100">
                <div className="container mx-auto text-center py-8 md:py-12 lg:py-20 px-4 space-y-4 md:space-y-6">
                    <SectionHeader title="Share your experience with us" description="We'd love to know how your experience was! Your feedback helps us understand what we're doing right and where we can improve to serve you even better." />
                    <div className="flex justify-center">
                        <TestimonialModal />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
