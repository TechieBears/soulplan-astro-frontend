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
import curly from "../../assets/services/carddesign.png";
import corner1 from "../../assets/services/corner1.png";


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
];

export default function HomeBestServices() {
  return (
    <section className="py-16 bg-[#fff9f5] relative">
      {/* Top corner decoration */}
      <img
        src={corner1}
        alt="corner"
        className="absolute top-0 left-0 w-24"
      />
      <img
        src={corner1}
        alt="corner"
        className="absolute top-0 right-0 w-24 rotate-90"
      />

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
          Our Best Services
        </h2>
        <div className="mt-2 flex justify-center">
          <div className="w-32 border-b-2 border-pink-400"></div>
        </div>
      </div>

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
      <div className="text-center mt-12">
        <button className="px-6 py-3  bg-gradient-to-r from-purple-500 to-red-500 text-white font-medium shadow-lg hover:opacity-90 transition">
          View All Services
        </button>
      </div>

      {/* Bottom corner decoration */}
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
    </section>
  );
}
