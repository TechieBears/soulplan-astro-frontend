"use client";
import React from "react";
import service1 from "../../assets/services/service1.png";
import service2 from "../../assets/services/service2.png";
import service3 from "../../assets/services/service3.png";
import service4 from "../../assets/services/service4.png";
import service5 from "../../assets/services/service5.png";
import service6 from "../../assets/services/service6.png";
import service7 from "../../assets/services/service7.png";
import service8 from "../../assets/services/service8.png";
import service9 from "../../assets/services/service9.png";
import service10 from "../../assets/services/service10.png";
import service11 from "../../assets/services/service11.png";
import service12 from "../../assets/services/service12.png";
import service13 from "../../assets/services/service13.png";
import service14 from "../../assets/services/service14.png";
import service15 from "../../assets/services/service15.png";
import service16 from "../../assets/services/service16.png";

import curly from "../../assets/services/carddesign.png";
import corner1 from "../../assets/services/corner1.png";
import underline from "../../assets/undertext.png";
import { formBtn3 } from "../../utils/CustomClass";
import { useNavigate } from "react-router-dom";

// Service card data
const services = [
    {
        title: "Palmistry",
        img: service1,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Astrology",
        img: service2,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Tarot Card Reading",
        img: service3,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Numerology Consultation",
        img: service4,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Theta Healing",
        img: service5,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Pranic Healing",
        img: service6,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Crystal Healing",
        img: service7,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Spiritual Meditation",
        img: service8,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Akashic Records Reading",
        img: service9,
        desc: "Your hands hold the story of your life.",
    },

    {
        title: "Past Life Regression Therapy",
        img: service10,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Inner Child & Subconscious Mind",
        img: service11,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Angel Therapy Oracle Card Reading",
        img: service12,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Reiki Healing",
        img: service13,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Pychicological Counseling",
        img: service14,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Autowriting Services",
        img: service15,
        desc: "Your hands hold the story of your life.",
    },
    {
        title: "Vastu Consultation",
        img: service16,
        desc: "Your hands hold the story of your life.",
    },
];

export default function HomeBestServices({ limit = 8, showCorners = true, showbestservicetext = true }) {
    const navigate = useNavigate();

    const handleServiceClick = (title) => {
        const serviceRoutes = {
            "Palmistry": "/services/palmistry",
            "Astrology": "/services/astrology",
            "Tarot Card Reading": "/services/tarot-card",
            "Numerology Consultation": "/services/numerology",
            "Theta Healing": "/services/theta-healing",
            "Pranic Healing": "/services/pranic-healing",
            "Crystal Healing": "/services/crystal-healing",
            "Spiritual Meditation": "/services/spiritual-meditation",
            "Akashic Records Reading": "/services/akashic-records",
            "Past Life Regression Therapy": "/services/past-life-regression",
            "Inner Child & Subconscious Mind": "/services/inner-child",
            "Angel Therapy Oracle Card Reading": "/services/angel-therapy",
            "Reiki Healing": "/services/reiki-healing",
            "Pychicological Counseling": "/services/psychological-counseling",
            "Autowriting Services": "/services/autowriting",
            "Vastu Consultation": "/services/vastu"
        };

        const route = serviceRoutes[title];
        if (route) {
            navigate(route);
        }
    };
    return (
        <section className="py-16 !bg-[#FFF9EF] relative">
            {showCorners && (
                <>
                    <img src={corner1} alt="corner" className="absolute top-0 left-0 w-16 md:w-20 xl:w-24" />
                    <img
                        src={corner1}
                        alt="corner"
                        className="absolute top-0 right-0 w-16 md:w-20 xl:w-24 rotate-90"
                    />
                </>
            )}

            {/* Heading */}
            <div className="text-center mb-12">
                {showbestservicetext && (
                    <>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                            <span className="text-p">Our Best Services</span>
                        </h2>
                        <img
                            src={underline}
                            alt="Underline"
                            className="w-40 md:w-56 h-10 mt-3 mx-auto"
                        />
                    </>
                )}
            </div>

            {/* Grid */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 xl:px-0">
                {services.slice(0, limit).map((service, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleServiceClick(service.title)}
                        className=" rounded-lg border border-gray-200 overflow-hidden text-center p-4 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ease-in-out"
                    >
                        <img
                            src={service.img}
                            alt={service.title}
                            className="w-full h-30 object-cover rounded-md"
                        />
                        <h3 className="mt-4 text-xl font-semibold font-tbLex">{service.title}</h3>
                        <img
                            className="justify-self-center w-30 h-10 object-fit rounded-md"
                            src={curly}
                            alt="divider"
                        />
                        <p className="text-slate-600 mt-2 px-4 text-sm font-tbPop font-normal">{service.desc}</p>
                        <span className="mt-3 inline-block text-gray-500 text-lg">→</span>
                    </div>
                ))}
            </div>


            {/* Button */}
            <div className="text-center  justify-self-center mt-12">
                <button className={` ${formBtn3}`}>View All Services</button>
            </div>

            {/* Bottom corner decoration */}
            {showCorners && (
                <>
                    <img
                        src={corner1}
                        alt="corner"
                        className="absolute bottom-0 left-0 w-24 -rotate-90"
                    />
                    <img
                        src={corner1}
                        alt="corner"
                        className="absolute bottom-0 right-0 w-24 rotate-180"
                    />
                </>
            )}
        </section>
    );
}
