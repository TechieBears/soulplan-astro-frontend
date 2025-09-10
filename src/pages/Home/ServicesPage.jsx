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
import Breadcrumbs from "../../components/breadcrum";
import Testimonials from "../../components/testimonial";
// import HomeBestServices from "../../components/HomeComponents/HomeBestServices";

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



const ServicesPage = () => {
  return (
    <>
    <div className="container bg-[#fff9f5] mt-12 mx-auto px-4 py-4 mt-20">
      <Breadcrumbs />
      {/* <HomeBestServices /> */}
      <section className="py-16  relative">
        {/* Top corner decoration */}
        {/* <img
          src={corner1}
          alt="corner"
          className="absolute top-0 left-0 w-24"
        />
        <img
          src={corner1}
          alt="corner"
          className="absolute top-0 right-0 w-24 rotate-90"
        /> */}

        {/* Heading */}
        {/* <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-10 text-center leading-snug">
            <span className="text-blue-600">Professional Qualifications</span>
            <br />
            <span className="text-pink-600">& Certifications</span>
          </h2> */}

          {/* Underline */}
          {/* <img
            src={underline}
            alt="Underline"
            className="w-40 md:w-56 h-10 mt-3 mx-auto"
          />
        </div> */}

        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4 hover:shadow-lg transition"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-30 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
              <img
                className="justify-self-center w-30 h-10 object-fit rounded-md"
                src={curly}
              />
              <p className="text-gray-600 mt-2 text-sm">{service.desc}</p>
              <span className="mt-3 inline-block text-gray-500 text-lg">→</span>
            </div>
          ))}
        </div>

        {/* Button */}
        {/* <div className="text-center mt-12">
          <button className="px-6 py-3  bg-gradient-to-r from-purple-500 to-red-500 text-white font-medium shadow-lg hover:opacity-90 transition">
            View All Services
          </button>
        </div> */}

        {/* Bottom corner decoration */}
        {/* <img
          src={corner1}
          alt="corner"
          className="absolute bottom-0 left-0 w-24 -rotate-90"
        />
        <img
          src={corner1}
          alt="corner"
          className="absolute bottom-0 right-0 w-24 rotate-180"
        /> */}
      </section>
    </div>
    <Testimonials/>
    </>
  );
};

export default ServicesPage;
