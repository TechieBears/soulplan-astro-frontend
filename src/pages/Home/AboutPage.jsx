import AnimatedNumbers from "react-animated-numbers";
import Breadcrumbs from "../../components/breadcrum";
// import ArrowBtn from '../../components/Buttons/ArrowBtn'
import Certifications from "../../components/HomeComponents/HomeCertifications";
import {
  FaUserShield,
  FaVideo,
  FaBell,
  FaMobileAlt,
  FaLock,
} from "react-icons/fa";
import { GiCrystalBall } from "react-icons/gi";

const stats = [
  { value: 15, label: "Services" },
  { value: 10, label: "Years Experience" },
  { value: 8, label: "Countries" },
];

const features = [
  {
    icon: <GiCrystalBall className="text-red-500 text-3xl" />,
    title: "15+ Trusted Services",
    desc: "Covering love, career, destiny, and more",
  },
  {
    icon: <FaUserShield className="text-orange-500 text-3xl" />,
    title: "Certified Astrologer",
    desc: "Experienced and verified spiritual guide",
  },
  {
    icon: <FaVideo className="text-green-500 text-3xl" />,
    title: "Instant Zoom Booking",
    desc: "Secure a session with just a few clicks",
  },
  {
    icon: <FaBell className="text-cyan-500 text-3xl" />,
    title: "Real-Time Notifications",
    desc: "Never miss a reading or reminder",
  },
  {
    icon: <FaMobileAlt className="text-pink-500 text-3xl" />,
    title: "App + Web Support",
    desc: "Use it on any device, anywhere",
  },
  {
    icon: <FaLock className="text-indigo-500 text-3xl" />,
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-gradient inline-block">
                    <AnimatedNumbers
                      includeComma
                      animateToNumber={stat.value}
                      transitions={() => ({
                        type: "spring",
                        duration: 1.2,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start justify-start hover:shadow-lg transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
