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

export default function Certifications({ showTopImage = true }) {
    return (
        <div
            className={`flex flex-col items-center justify-center bg-no-repeat bg-center bg-cover w-full h-full z-10 `}
            style={{ backgroundImage: `url(${background})` }}
        >

            {showTopImage && <img src={top_certification} alt="" />}
            <div className=" container mx-auto flex flex-col items-center justify-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-10 text-center leading-snug text-p">
                    Professional Qualifications & Certifications
                </h2>

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
                            <img
                                src={star}
                                alt="Wreath"
                                className="absolute inset-0 w-72 h-full object-cover pointer-events-none select-none"
                            />

                            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 text-yellow-500 text-5xl">
                                ★
                            </div>

                            <p className="relative z-10 text-sm font-tbPop font-normal leading-tight px-4">
                                {cert.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
