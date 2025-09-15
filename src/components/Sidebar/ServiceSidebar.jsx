import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formBtn3 } from "../../utils/CustomClass";
import { ArrowRight2,Timer1, Mobile  } from 'iconsax-reactjs'
import BreadCrumbs from "../../components/breadcrum";

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
  const location = useLocation();
  const navigate = useNavigate();

  // Set active service based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/palmistry")) setActive("palmistry");
    else if (path.includes("/astrology")) setActive("astrology");
    else if (path.includes("/tarot")) setActive("tarot");
    else if (path.includes("/numerology")) setActive("numerology");
  }, [location]);

  const content = serviceDetails[active] || serviceDetails.palmistry;

  return ( 
    <>
    <BreadCrumbs currentService={services.find(s => s.id === active)?.title} />
    <div className="min-h-screen p-12 bg-white">
      <div className="container mx-auto px-4 flex">
      {/* Sidebar */}
      <aside className="w-80 border-r  bg-white p-6 space-y-2">
        <ul className="space-y-1">
          {services.map((service) => (
            <li key={service.id}>
              <button
                onClick={() => setActive(service.id)}
                className={`w-full text-left px-4 py-2 transition relative ${
                  active === service.id
                    ? "text-p font-semibold p-8"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{service.title}</span>
                  {active === service.id && (
                    <ArrowRight2 className="w-4 h-4 text-p" />
                  )}
                </div>
                {active === service.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ffecd2] to-[#fcb69f]"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Image */}
          <img
            src={content.img}
            alt={content.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          {/* Booking Card */}
          <div className="bg-[#FFF2DB] p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-2 text-p">
              {content.title}
            </h3>
            <p className="text-gray-700">{content.description}</p>
            <div className="flex justify-between items-center mt-4 ">
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Timer1 className="w-4 h-4 text-p"/>
                  <span>{content.session}</span>
                </li> 
                <li className="flex items-center gap-2">
                  <Mobile className="w-4 h-4 text-p"/>
                  <span>{content.mode}</span>
                </li>
              </ul>
              <button 
                className={`${formBtn3} mt-4 justify-self-end`}
                onClick={() => navigate('/booking', { state: { service: content.title } })}
              >
                {content.btnText}
              </button>
            </div>
          </div>

          {/* Details Section */}
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
      </div>
    </div>
    </>
  );
};

export default SidebarLayout;
