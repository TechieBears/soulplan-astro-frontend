import { useNavigate } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import logo from "../../assets/logo.png"; // update with your actual logo
import footerBg from "../../assets/footer.png"; // update with your actual background

const HomeFooter = () => {
    const navigate = useNavigate();

    return (
        <footer
            className="relative bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url(${footerBg})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative container mx-auto px-5 xl:px-0 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/10 backdrop-blur-[3px] rounded-2xl p-8 shadow-lg border border-slate-600">
                    {/* ===== Left: Office Location ===== */}
                    <div>
                        <h3 className="text-lg font-medium font-tbLex mb-4">
                            Office Location
                        </h3>
                        <p className="text-sm">YUJAINFO CONNECTING TO EXPLORE PRIVATE LIMITED</p>
                        <p className="text-sm">A/3004, ROSA, MONTANA, VASANT OSCAR,</p>
                        <p className="text-sm mb-4">MULUND-WEST, Mumbai - 400080</p>
                        <p className="flex items-center gap-2 text-sm mb-2">
                            <MdEmail size={18} />
                            <a
                                href="mailto:support@soulplan.net"
                                className="hover:underline transition-colors duration-200"
                            >
                                support@soulplan.net
                            </a>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <MdPhone size={18} />
                            <a
                                href="tel:+919326511639"
                                className="hover:underline transition-colors duration-200"
                            >
                                +91 9326511639
                            </a>
                        </p>
                    </div>

                    <div className="flex flex-col sm:items-center sm:text-center">
                        <a href="/">
                            <img
                                src={logo}
                                alt="Soul Plan Logo"
                                className="h-14 w-14 mb-3 rounded-full cursor-pointer"
                            />
                        </a>
                        <h2 className="text-xl font-medium font-tbLex">SOUL PLAN</h2>
                        <p className="text-sm mt-2 max-w-lg font-tbPop font-normal text-slate-300">
                            SOUL PLAN is a brand of <br /> YUJAINFO CONNECTING TO EXPLORE PRIVATE LIMITED.
                        </p>
                    </div>
                    <div className="flex flex-col sm:items-center md:items-end">
                        <h3 className="text-lg mb-4 font-tbLex font-medium">
                            Quick Links
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <button
                                onClick={() => {
                                    navigate("/privacy-policy"),
                                        window.scrollTo(0, 0, { behavior: "smooth" });
                                }}
                                className="hover:underline text-left md:text-right"
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/terms-conditions"),
                                        window.scrollTo(0, 0, { behavior: "smooth" });
                                }}
                                className="hover:underline text-left md:text-right"
                            >
                                Terms & conditions
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/refund-cancellation-policy"),
                                        window.scrollTo(0, 0, { behavior: "smooth" });
                                }}
                                className="hover:underline text-left md:text-right"
                            >
                                Refund & Cancellation Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
