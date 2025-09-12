import AnimatedNumbers from "react-animated-numbers";
import Breadcrumbs from "../../components/breadcrum";
// import ArrowBtn from '../../components/Buttons/ArrowBtn'
import Certifications from "../../components/HomeComponents/HomeCertifications";

import trust1 from "../../assets/about/Astrology Application Nisha/trust1.png";
import trust2 from "../../assets/about/Astrology Application Nisha/trust2.png";
import trust3 from "../../assets/about/Astrology Application Nisha/trust3.png";
import trust4 from "../../assets/about/Astrology Application Nisha/trust4.png";
import trust5 from "../../assets/about/Astrology Application Nisha/trust5.png";
import trust6 from "../../assets/about/Astrology Application Nisha/trust6.png";

import trustg1 from "../../assets/about/Astrology Application Nisha/trust-g1.png";
import trustg2 from "../../assets/about/Astrology Application Nisha/trust-g2.png";
import trustg3 from "../../assets/about/Astrology Application Nisha/trust-g3.png";
import trustg4 from "../../assets/about/Astrology Application Nisha/trust-g4.png";
import trustg5 from "../../assets/about/Astrology Application Nisha/trust-g5.png";
import trustg6 from "../../assets/about/Astrology Application Nisha/trust-g6.png"; 


const stats = [
  { value: 15, label: "Services" },
  { value: 10, label: "Years Experience" },
  { value: 8, label: "Countries" },
];

const features = [
  {
    image: trust1,
    hoverimage: trustg1,
    title: "15+ Trusted Services",
    desc: "Covering love, career, destiny, and more",
  },
  {
    image: trust2,
    hoverimage: trustg2,
    title: "Certified Astrologer",
    desc: "Experienced and verified spiritual guide",
  },
  {
    hoverimage: trustg3,
    image: trust3,
    title: "Instant Zoom Booking",
    desc: "Secure a session with just a few clicks",
  },
  {
    image: trust4,
    hoverimage: trustg4,
    title: "Real-Time Notifications",
    desc: "Never miss a reading or reminder",
  },
  {
    image: trust5,
    hoverimage: trustg5,
    title: "App + Web Support",
    desc: "Use it on any device, anywhere",
  },
  {
    image: trust6,
    hoverimage: trustg6,
    title: "100% Private & Confidential",
    desc: "Your readings stay between you and the cosmos",
  },
];

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <Breadcrumbs />
      {/* <ArrowBtn /> */}
      <Certifications showTopImage={false} />

      <section className="w-full bg-[#fff6ef] py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-40 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <h3 className="text-5xl font-bold">
                  <span className="inline-block text-p">
                    <AnimatedNumbers
                      includeComma
                      animateToNumber={stat.value}
                      transitions={() => ({
                        type: "spring",
                        duration: 3.0,
                      })}
                    />
                  </span>
                </h3>
                <p className="text-gray-700 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
            <span className="text-p">Why Trust Our Platform</span>
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// FeatureCard component for hover logic
import { useState } from "react";

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`shadow-xl p-8 flex flex-col items-start justify-center transition cursor-pointer border border-gray-100 group ${
        hovered
          ? "bg-gradient-to-br from-pink-500 via-purple-500 to-purple-700 text-white scale-[1.03]"
          : "bg-white text-black hover:shadow-2xl"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 300 }}
    >
      <div className="mb-6 flex items-center justify-start w-full">
        <img
          src={hovered && feature.hoverimage ? feature.hoverimage : feature.image}
          alt={feature.title}
          className={`w-24 h-24 object-contain transition-all duration-300 drop-shadow-lg ${hovered ? "scale-110" : "scale-100"}`}
        />
      </div>
      <h3 className={`font-bold text-xl text-left transition-all duration-300 ${hovered ? "text-white" : "text-black"}`}>{feature.title}</h3>
      <p className={`mt-3 text-base text-left transition-all duration-300 ${hovered ? "text-white/80" : "text-gray-600"}`}>{feature.desc}</p>
    </div>
  );
}
export default AboutPage;
