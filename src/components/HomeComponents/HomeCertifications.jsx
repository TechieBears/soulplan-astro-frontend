import React from "react";
import top_certification from "../../assets/top-certification.png";
import background from "../../assets/certifications-bg.jpg";
import star from "../../assets/star.png";
import underline from "../../assets/undertext.png";

const certifications = [
  {
    title: "Masters in Career in Hospitality Management Program 2016",
  },
  {
    title:
      "International Certified Diploma in Hospitality Management, England, 2018",
  },
  {
    title:
      "International Certified Family Business Program, London Business School, England 2018",
  },
  {
    title: "Certified Life Coach",
  },
  {
    title: "2017- Degree in Counseling Psychology",
  },
  {
    title: "Excel Based Entrepreneurship",
  },
  {
    title: "Vision India Best Selling Author Award 2020",
  },
  {
    title: "Honorary Fellowship in Global CSR",
  },
];

export default function Certifications() {
  return (
    <div
      className="bg-[#f5f0e6] flex flex-col items-center justify-center "
      style={{ backgroundImage: `url(${background}) rotate(90deg)` }}
    >
      <img src={top_certification} alt="" />
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-10 text-center leading-snug">
        <span className="text-blue-600">Professional Qualifications</span>
        <br />
        <span className="text-pink-600">& Certifications</span>
      </h2>

      {/* Underline */}
      <img
        src={underline}
        alt="Underline"
        className="w-40 md:w-56 h-10 mt-3 mx-auto"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 gap-x-10 px-6 mt-10 mb-16">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center text-center w-64 h-64 p-8"
          >
            {/* Laurel wreath image (background decoration) */}
            <img
              src={star} // 👈 use your laurel wreath asset here
              alt="Wreath"
              className="absolute inset-0 w-72 h-full object-fill pointer-events-none select-none"
            />

            {/* Star on top */}
            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 text-yellow-500 text-5xl">
              ★
            </div>

            {/* Text inside */}
            <p className="relative z-10 text-sm leading-tight px-4">
              {cert.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
