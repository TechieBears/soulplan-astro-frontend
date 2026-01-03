import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaStar } from 'react-icons/fa';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getAllPublicTestimonials } from "../api";
import userImage from "../assets/user.webp";
import underline from "../assets/undertext.png";
import vectorImg from "../assets/Vector.png";
import hand from "../assets/helperImages/handImage.png";
import TestimonialModal from "./Modals/TestimonialModal";

const CHAR_LIMIT = 170;

const NavButton = ({ onClick, direction, className = "" }) => {
    const Icon = direction === 'left' ? CaretLeft : CaretRight;
    const size = className.includes('w-10') ? 20 : 24;
    return (
        <button type="button" onClick={onClick} className={`bg-[#CAD5E2] hover:bg-[#b8c4d1] rounded-full flex items-center justify-center transition-colors duration-200 shadow-md ${className}`}>
            <Icon size={size} className="text-black" weight="bold" />
        </button>
    );
};

const StarRating = ({ rating = 5 }) => (
    <div className="flex justify-center items-center mb-2">
        {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

const getUserName = (testimonial) => 
    testimonial?.user?.firstName && testimonial?.user?.lastName
        ? `${testimonial.user.firstName} ${testimonial.user.lastName}`
        : testimonial?.user_id?.name || testimonial?.name || "Anonymous User";

const getUserImage = (testimonial) => 
    testimonial?.user?.profileImage || testimonial?.user_id?.profileImage || 
    testimonial?.user_id?.image || testimonial?.image || userImage;

const TestimonialCard = ({ testimonial, isCenter, onReadMore }) => {
    const userName = getUserName(testimonial);
    const userImg = getUserImage(testimonial);
    const message = testimonial?.message || testimonial?.text || "";
    const shouldTruncate = message.length > CHAR_LIMIT;
    const displayMessage = shouldTruncate ? message.slice(0, CHAR_LIMIT) : message;

    return (
        <div className={`flex-shrink-0 transition-all duration-500 ease-out ${isCenter ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
            <div className="relative">
                <img src={vectorImg} alt="quote" className="absolute top-6 left-6 w-[66px] h-[51px] z-10" />
                <div className={`w-80 sm:w-96 md:w-[28rem] h-auto min-h-[18rem] sm:min-h-[20rem] md:min-h-[24rem] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center overflow-hidden ${isCenter ? 'bg-primary-gradient text-white shadow-lg' : 'bg-white text-gray-800 shadow-md'}`}>
                    <img src={userImg} alt={userName} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-6" onError={(e) => e.target.src = userImage} />
                    <p className={`text-sm sm:text-base leading-tight mb-2 break-words w-full ${isCenter ? 'text-white' : 'text-gray-600'}`} style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                        "{displayMessage}{shouldTruncate && '...'}"
                    </p>
                    {shouldTruncate && (
                        <button onClick={() => onReadMore(testimonial)} className={`text-xs sm:text-sm underline mb-4 hover:opacity-80 transition-opacity ${isCenter ? 'text-white' : 'text-blue-600'}`}>
                            Read more
                        </button>
                    )}
                    <StarRating rating={testimonial?.rating} />
                    <h4 className={`font-semibold text-sm sm:text-base ${isCenter ? 'text-white' : 'text-gray-800'}`}>{userName}</h4>
                </div>
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
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleNavigation = useCallback((direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => {
            if (direction === 'prev') return prev === 0 ? testimonials.length - 1 : prev - 1;
            return prev >= testimonials.length - 1 ? 0 : prev + 1;
        });
        setTimeout(() => setIsTransitioning(false), 500);
    }, [testimonials.length, isTransitioning]);

    const handlePrev = useCallback(() => handleNavigation('prev'), [handleNavigation]);
    const handleNext = useCallback(() => handleNavigation('next'), [handleNavigation]);

    const getVisibleCards = useMemo(() => 
        testimonials.length === 0 ? [] : 
        [-1, 0, 1].map(i => ({
            testimonial: testimonials[(currentIndex + i + testimonials.length) % testimonials.length],
            isCenter: i === 0
        }))
    , [currentIndex, testimonials]);

    const handleReadMore = useCallback((testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsModalOpen(true);
    }, []);

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

                        <div className="overflow-hidden px-2 sm:px-4 md:px-8 lg:px-16">
                            {loading ? (
                                <div className="flex justify-center">
                                    <div className="w-80 sm:w-96 md:w-[28rem] h-auto min-h-[18rem] sm:min-h-[20rem] md:min-h-[24rem] rounded-xl bg-gray-200 animate-pulse" />
                                </div>
                            ) : testimonials.length > 0 ? (
                                <div className="flex items-center justify-center">
                                    <div className="relative w-full max-w-7xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex transition-transform duration-500 ease-out">
                                                {getVisibleCards.map(({ testimonial, isCenter }, i) => (
                                                    <div key={`${testimonial._id}-${i}`} className="px-3" style={{ display: testimonials.length === 1 && !isCenter ? 'none' : 'block' }}>
                                                        <TestimonialCard testimonial={testimonial} isCenter={isCenter} onReadMore={handleReadMore} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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

            {isModalOpen && selectedTestimonial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Full Testimonial</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={getUserImage(selectedTestimonial)} alt="User" className="w-16 h-16 rounded-full object-cover" onError={(e) => e.target.src = userImage} />
                            <div className="text-left">
                                <h4 className="font-semibold text-gray-800">{getUserName(selectedTestimonial)}</h4>
                                <StarRating rating={selectedTestimonial?.rating} />
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            "{selectedTestimonial?.message || selectedTestimonial?.text}"
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Testimonials;