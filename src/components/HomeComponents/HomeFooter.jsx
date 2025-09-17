import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
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
                        <h3 className="text-lg font-medium font-tbLex mb-4">Office Location</h3>
                        <p className="text-sm">Germany —</p>
                        <p className="text-sm">785 15th Street, Office 478</p>
                        <p className="text-sm mb-4">Berlin, DE 81566</p>
                        <p className="flex items-center gap-2 text-sm mb-2">
                            <MdEmail size={18} /> info@examplegmail.com
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <MdPhone size={18} /> +1 830 741 55 69
                        </p>
                    </div>

                    {/* ===== Center: Logo + Tagline ===== */}
                    <div className="flex flex-col items-center text-center">
                        <img src={logo} alt="Soulplane Logo" className="h-14 w-14 mb-3 rounded-full" />
                        <h2 className="text-xl font-medium font-tbLex">SOULPLANE</h2>
                        <p className="text-sm mt-2 max-w-xs font-tbPop font-normal text-slate-300">
                            Stars aren’t just shining dots each star has a story to tell.
                        </p>
                    </div>

                    {/* ===== Right: Social Links ===== */}
                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-lg mb-4 font-tbLex font-medium">Social Links</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                                <FaXTwitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ===== Bottom Bar ===== */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm border-t border-slate-600 pt-4">
                    <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <button
                            onClick={() => navigate("/privacy-policy")}
                            className="hover:underline"
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => navigate("/support")}
                            className="hover:underline"
                        >
                            Customer Support
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
