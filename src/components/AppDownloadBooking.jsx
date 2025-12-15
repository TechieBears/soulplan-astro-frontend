import { useNavigate } from "react-router-dom";
import playstore from "../assets/google-play-black.png";
import phoneMockup from "../assets/phone-mockup.png";
import { formBtn3 } from "../utils/CustomClass";

const AppDownloadBooking = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="bg-[#EFF2FA]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between pt-16 md:pt-20 gap-10 xl:gap-10 px-5 xl:px-0">
                    <div className="text-left flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-xl md:text-2xl xl:text-5xl w-full font-bold font-tbPop text-black text-center md:text-left pb-3">
                            Download Our <span className="text-p">"Soul Plan"</span> App Today
                        </h2>
                        <p className="text-gray-600 text-sm lg:text-base text-center md:text-left mb-2">
                            For a sameless experience, download our apps on your phone
                        </p>
                        <div className="flex justify-start pt-4">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={playstore} alt="Google Play" className="h-10 lg:h-14" />
                            </a>
                        </div>
                    </div>
                    <div className="relative flex items-end justify-end w-full h-full">
                        <img src={phoneMockup} alt="App Preview" className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] relative z-10 object-contain" />
                    </div>
                </div>
            </section>

            <section className="bg-[#FFEED3] py-12 md:py-16 lg:h-96 flex items-center justify-center px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-base sm:text-lg md:text-[20px] uppercase bg-primary-gradient bg-clip-text text-transparent mb-3 md:mb-4">Discover Your Self</h2>
                    <p className="text-xl sm:text-2xl md:text-[32px] font-bold text-black mb-4 md:mb-6 leading-tight">Explore a complete range of spiritual <br className="hidden sm:block" /> and healing services.</p>
                    <div className="flex justify-center">
                        <button className={`btn ${formBtn3} !w-full sm:!w-64 !rounded-xs`} onClick={() => navigate("/services")}>
                            <span className="text-white">Book Your Session</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppDownloadBooking;
