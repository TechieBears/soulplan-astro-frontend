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
import moon from "../../assets/helperImages/moon.png"
import sun from "../../assets/helperImages/sun.png"
import leftImage from "../../assets/helperImages/leftDesign.png"
import rightImage from "../../assets/helperImages/rightDesign.png"

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
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16">

            <Breadcrumbs />
            {/* <ArrowBtn /> */}
            <Certifications showTopImage={false} />

            <section className="w-full  py-16 px-5 xl:px-0 relative">
                <div className="absolute top-56 left-0 opacity-30  ">
                    <img src={rightImage} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="absolute top-3/3 -right-10 scale-75 opacity-30 ">
                    <img src={leftImage} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="absolute bottom-10 -left-20 scale-75  ">
                    <img src={sun} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="absolute bottom-5 -right-10 scale-75">
                    <img src={moon} alt="" className="w-full h-full object-fill" />
                </div>
                <div className="container mx-auto ">
                    {/* Stats Section */}
                    <div className="flex sm:flex-col md:flex-row items-center justify-center gap-5 sm:gap-10 md:gap-20 lg:gap-30 xl:gap-40 pt-10 lg:pt-20 pb-28">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-left">
                                <h6 className='text-red-500 font-tbLex font-bold text-6xl sm:text-9xl md:text-8xl  xl:text-9xl text-center tracking-tighter flex justify-center items-center'>
                                    <AnimatedNumbers
                                        animateToNumber={stat.value}
                                        fontStyle={{ textAlign: "center", letterSpacing: -5 }}
                                        configs={(_, index) => {
                                            return {
                                                mass: 1,
                                                tension: 230 * (index + 1),
                                                friction: 140,
                                            };
                                        }}
                                    />

                                </h6>
                                <p className="text-slate-800 mt-2 text-center font-tbLex font-medium text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                        <span className="text-p">Why Trust Our Platform</span>
                    </h2>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

function FeatureCard({ feature }) {
    return (
        <div
            className={`shadow-lg bg-white rounded-md p-4 md:p-6 xl:p-8 h-[230px] md:h-[260px] xl:h-[270px] flex flex-col items-start justify-center cursor-pointer border transition-all duration-500 border-gray-100 group hover:bg-linear-gradient group space-y-2 z-10`}

        >
            <div className=" flex items-center justify-start w-full">
                <img
                    src={feature.image}
                    alt={feature.title}
                    className={`w-32 md:w-28 h-32 md:h-28 xl:w-32 xl:h-32 object-contain transition-all duration-500 drop-shadow-lg group-hover:scale-110 group-hover:hidden`}
                />
                <img
                    src={feature.hoverimage}
                    alt={feature.title}
                    className={`w-32 md:w-28 h-32 md:h-28 xl:w-32 xl:h-32 object-contain transition-all duration-500 drop-shadow-lg group-hover:scale-110 hidden group-hover:block`}
                />
            </div>
            <div className="space-y-1">
                <h3 className={`font-semibold font-tbLex tracking-tight text-base md:text-xl text-left  text-black group-hover:text-white`}>{feature.title}</h3>
                <p className={`text-xs xl:text-sm font-tbPop text-left text-slate-400 group-hover:text-white`}>{feature.desc}</p>
            </div>
        </div>
    );
}
export default AboutPage;
