import HomeBanner from "../../components/HomeComponents/HomeBanner";
import HomeBestServices from "../../components/HomeComponents/HomeBestServices";
import HomeCertifications from "../../components/HomeComponents/HomeCertifications";
import Testimonials from "../../components/testimonial";
import AppDownloadBooking from "../../components/AppDownloadBooking";
import { useEffect, useState } from "react";
import { getActiveBanners } from "../../api";
import { environment } from "../../env";
import ReferralPromptModal from "../../components/Modals/ReferralPromptModal";
import { useSelector } from "react-redux";

const HomePage = () => {
    const [slidesData, setSlidesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isLogged, isRegistered } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.userDetails);
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    // Check if profile is complete - check for empty strings and missing values
    const isProfileComplete = !!(user?.firstName?.trim() && user?.lastName?.trim() && user?.mobileNo?.trim() && user?.gender?.trim());

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isLogged && user) {
            const dontShow = localStorage.getItem(`dontShowReferralModal_${user._id}`);

            // Show modal if profile is incomplete OR if profile is complete but user hasn't opted out of referral modal
            if (!isProfileComplete || (!dontShow && isProfileComplete)) {
                setOpen(true);
            } else {
                console.log('❌ Not opening modal - conditions not met');
            }
        }
    }, [isLogged, user, isProfileComplete, isRegistered]);


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
        <div className="bg-slate1">
            <HomeBanner slidesData={slidesData} isLoading={isLoading} />
            <HomeCertifications />
            <HomeBestServices />
            <Testimonials />
            <AppDownloadBooking />
            {isLogged && (
                <ReferralPromptModal
                    open={open}
                    toggle={toggle}
                    forceProfileScreen={!isProfileComplete}
                />
            )}
        </div>
    );
};

export default HomePage;
