import HomeBanner from "../../components/HomeComponents/HomeBanner";
import HomeBestServices from "../../components/HomeComponents/HomeBestServices";
import HomeCertifications from "../../components/HomeComponents/HomeCertifications";
import Testimonials from "../../components/testimonial";
import { useEffect, useState } from "react";
import { getActiveBanners } from "../../api";
import { environment } from "../../env";
import ReferralPromptModal from "../../components/Modals/ReferralPromptModal";
import { useSelector } from "react-redux";

const HomePage = () => {
    const [slidesData, setSlidesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const login = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userDetails);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (login && user?._id) {
            const dontShowAgain = localStorage.getItem(`dontShowReferralModal_${user._id}`);
            setOpen(!dontShowAgain);
        } else {
            setOpen(false);
        }
    }, [login, user?._id]);

    const toggle = () => {
        setOpen(!open);
    }


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
                            window.location.href = "/services";
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
        <>
            <HomeBanner slidesData={slidesData} isLoading={isLoading} />
            <HomeCertifications />
            <HomeBestServices />
            <Testimonials />
            {login && <ReferralPromptModal open={open} toggle={toggle} />}
        </>
    );
};

export default HomePage;
