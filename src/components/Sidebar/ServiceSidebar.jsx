import { useState } from "react";
import { formBtn3 } from "../../utils/CustomClass";
import { Mobile } from 'iconsax-reactjs';
import Breadcrumbs from "../../components/breadcrum";
import { CaretRight, ClockCountdown } from "@phosphor-icons/react";

// Sidebar + Content Data
const services = [
    { id: "palmistry", title: "Palmistry" },
    { id: "astrology", title: "Astrology" },
    { id: "tarot", title: "Tarot Reading" },
    { id: "numerology", title: "Numerology Consultation" },
    { id: "theta", title: "Theta Healing" },
    { id: "pranic", title: "Pranic Healing" },
    { id: "crystal", title: "Crystal Healing" },
    { id: "meditational", title: "Spiritual Meditational" },
    { id: "akashic", title: "Akashic Record Reading" },
    { id: "pastlife", title: "Post Life Regression Therapy" },
    { id: "innerchild", title: "Inner Child & Subconscious Mind" },
    { id: "angel", title: "Angel Therapy Oracle Card Reading" },
    { id: "reiki", title: "Reiki Healing" },
    { id: "counselling", title: "Psychological Counselling" },
    { id: "auto", title: "Auto writing Service" },
    { id: "vastu", title: "Vastu Consultation" },
];

// Dynamic Content for each service
const serviceDetails = {
    palmistry: {
        title: "Book Your Session",
        img: "https://plus.unsplash.com/premium_photo-1677014616466-7d07ef5d5250?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // sample image

        description:
            "Book your palm reading today and take a step closer to clarity.",
        session: "Session Duration: 30–60 minutes",
        mode: "Mode: In-person / Online",
        btnText: "Check Availability",
        details: {
            intro:
                "Your hands are more than just looks—they’re maps of your life. Our palmistry sessions dive deep into life’s lines, mounts and signs of your palm to reveal insights about your past, present, and future.",
            sections: [
                {
                    title: "What Can You Discover?",
                    items: [
                        "Love & Relationships – Who’s your ideal partner? Why are past patterns repeating?",
                        "Career & Business – What field suits your personality? Is it the right time to start a business?",
                        "Health & Emotional Balance – How to overcome stress and find inner peace?",
                        "Life Path & Purpose – Why do you feel this calling? What’s your true purpose?",
                    ],
                },
                {
                    title: "Why Choose Our Palmistry Reading?",
                    items: [
                        "Based on traditional + modern palmistry practices",
                        "Personalized insights tailored to your unique palm",
                        "Remote & in-person consultations available",
                    ],
                },
            ],
        },
    },
    astrology: {
        title: "Astrology Reading",
        img: "https://source.unsplash.com/600x400/?astrology,zodiac",
        description:
            "Unlock the secrets of your stars and planetary alignments for better clarity in life.",
        session: "Session Duration: 45–90 minutes",
        mode: "Mode: Online / In-person",
        btnText: "Book Astrology Reading",
        details: {
            intro:
                "Astrology gives you insights into your past, present, and future by studying your natal chart and planetary positions.",
            sections: [
                {
                    title: "What You’ll Learn",
                    items: [
                        "Your sun, moon, and rising signs explained",
                        "Upcoming planetary shifts",
                        "Personal compatibility with others",
                    ],
                },
            ],
        },
    },
    tarot: {
        title: "Tarot Card Reading",
        img: "https://source.unsplash.com/600x400/?tarot,cards",
        description:
            "Discover insights about your life path through ancient tarot wisdom.",
        session: "Session Duration: 30–45 minutes",
        mode: "Mode: Online / In-person",
        btnText: "Book Tarot Reading",
        details: {
            intro:
                "Tarot cards reveal hidden truths and provide guidance for your life's journey.",
            sections: [
                {
                    title: "What Tarot Can Reveal",
                    items: [
                        "Love and relationship guidance",
                        "Career and financial insights",
                        "Spiritual growth opportunities",
                    ],
                },
            ],
        },
    },
    numerology: {
        title: "Numerology Consultation",
        img: "https://source.unsplash.com/600x400/?numbers,numerology",
        description:
            "Unlock the power of numbers in your life for better understanding.",
        session: "Session Duration: 60 minutes",
        mode: "Mode: Online / In-person",
        btnText: "Book Numerology Session",
        details: {
            intro:
                "Numbers hold the key to understanding your personality, destiny, and life path.",
            sections: [
                {
                    title: "Numerology Insights",
                    items: [
                        "Life path number analysis",
                        "Destiny number interpretation",
                        "Lucky numbers and dates",
                    ],
                },
            ],
        },
    },
};

const SidebarLayout = () => {
    const [active, setActive] = useState("palmistry");
    return (
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16">
            <Breadcrumbs currentService={active} />
            <div className="container mx-auto px-5 xl:px-0 flex flex-col-reverse lg:flex-row xl:py-10 space-y-5 lg:space-x-10">
                {/* Sidebar */}
                <SideBar services={services} active={active} setActive={setActive} />

                {/* Main Content */}
                <MainSection content={serviceDetails[active]} />
            </div>
        </div>
    );
};

const SideBar = ({ services, active, setActive }) => {
    return (
        <aside className="w-full lg:w-1/4 space-y-2 pb-14 lg:pb-0">
            <ul className="">
                {services.map((service) => (
                    <li key={service.id}>
                        <button
                            onClick={() => setActive(service.id)}
                            className={`w-full text-left px-4 py-4 transition-all duration-300 relative font-medium font-tbPop text-md ${active === service.id
                                ? "text-p bg-[#ffecd2]"
                                : "hover:bg-[#ffecd2]/50 text-slate-700"
                                }`}
                        >
                            <div className="flex items-center justify-between overflow-hidden text-nowrap">
                                <span className="text-ellipsis overflow-hidden">{service.title}</span>
                                <span className="text-p"><CaretRight size={20} className="text-black" /></span>
                            </div>
                            {active === service.id ? <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-gradient rounded-3xl transition-colors duration-300" /> : <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-200 rounded-full" />}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

const MainSection = ({ content }) => {
    return (
        <main className="flex-1 !my-0 ">
            <div className="space-y-8">
                <img
                    src={content.img}
                    alt={content.title}
                    className="w-full sm:h-[60vh] object-cover rounded-md"
                />

                <div className="bg-[#FFF2DB] p-6 rounded-md space-y-3 ">
                    <h3 className="text-xl font-medium text-p font-tbLex">
                        {content.title}
                    </h3>
                    <p className="text-gray-600 font-tbPop font-normal text-md">{content.description}</p>
                    <div className="flex justify-start  lg:justify-between  flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0">
                        <div className="space-y-3">
                            <div className="space-x-1.5 flex items-center">
                                <ClockCountdown size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">Session Duration:  {content.session}</h4>
                            </div>
                            <div className="space-x-1.5 flex items-center">
                                <Mobile size={20} />
                                <h4 className="text-slate-700 text-sm font-tbPop font-normal">Mode: {content.session}</h4>
                            </div>
                        </div>
                        <button
                            className={`${formBtn3}   lg:!w-auto`}
                            onClick={() => navigate('/booking', { state: { service: content.title } })}
                        >
                            {content.btnText}
                        </button>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-gray-700 mb-6">{content.details.intro}</p>
                    {content.details.sections.map((section, i) => (
                        <div key={i} className="mb-8">
                            <h4 className="font-semibold text-lg mb-2">{section.title}</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {section.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
export default SidebarLayout;
