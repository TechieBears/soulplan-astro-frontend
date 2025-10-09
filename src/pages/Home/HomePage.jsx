import HomeBanner from "../../components/HomeComponents/HomeBanner";
import HomeBestServices from "../../components/HomeComponents/HomeBestServices";
import HomeCertifications from "../../components/HomeComponents/HomeCertifications";
import Testimonials from "../../components/testimonial";
import { useEffect, useState } from "react";
import { getActiveBanners } from "../../api";
import { environment } from "../../env";
import { FaWhatsapp } from "react-icons/fa";

const HomePage = () => {
    const [banners, setBanners] = useState([]);
    const [slidesData, setSlidesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            setIsLoading(true);
            const banners = await getActiveBanners("website");

            const formattedSlides = await Promise.all(
                banners.map(async (item) => {
                    let imageUrl;
                    if (item.image && item.image.startsWith("http")) {
                        imageUrl = item.image;
                    } else {
                        const baseUrl = environment.baseUrl.replace("/api/", "");
                        imageUrl = item.image ? `${baseUrl}${item.image}` : "";
                    }
                    let finalImageUrl = imageUrl;

                    try {
                        const response = await fetch(imageUrl, {
                            mode: "cors",
                            credentials: "omit",
                        });

                        if (response.ok) {
                            const blob = await response.blob();
                            finalImageUrl = URL.createObjectURL(blob);
                        } else {
                            console.warn(
                                "Fetch failed, using original URL:",
                                response.status
                            );
                        }
                    } catch (error) {
                        console.warn(
                            "Blob conversion failed, using original URL:",
                            error.message
                        );
                    }

                    return {
                        id: item.id,
                        image: finalImageUrl,
                        title: item.title,
                        description: item.description,
                        button: true,
                        background: true,
                        video: null,
                        onClick: () => {
                            window.location.href = '/services';
                        },
                        onImageError: (e) => {
                            console.error("Image failed to load:", finalImageUrl);
                            console.error("Error event:", e);
                        },
                    };
                })
            );
            setSlidesData(formattedSlides);
            setIsLoading(false);
        };

        fetchSlides();
    }, []);

    return (
        <div>
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
            `}</style>
            <HomeBanner slidesData={slidesData} isLoading={isLoading} />
            <HomeCertifications />
            <HomeBestServices />
            <Testimonials />
            {/* <HomeFooter /> */}
            
            <div className="fixed bottom-6 right-5 z-50 group">
              <a
                href="https://wa.me/918693000900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 text-white rounded-full shadow-lg overflow-hidden transition-all duration-500 group-hover:pr-4"
              >
                {/* Icon */}
                <div className="flex items-center justify-center bg-green-600 p-4 rounded-full transition-all duration-500 group-hover:rounded-l-full group-hover:rounded-r-none">
                  <FaWhatsapp size={24} />
                </div>

                {/* Number (appears on hover) */}
                <span className="max-w-0 overflow-hidden opacity-0 text-white font-medium text-sm transition-all duration-500 group-hover:max-w-xs group-hover:opacity-100 ml-2">
                  +91 86930 00900
                </span>
              </a>
            </div>
        </div>
    );
};

export default HomePage;
