import HomeBanner from '../../components/HomeComponents/HomeBanner'
import HomeBestServices from '../../components/HomeComponents/HomeBestServices'
import HomeCertifications from '../../components/HomeComponents/HomeCertifications'
import Testimonials from '../../components/testimonial'
import { useEffect, useState } from 'react';
import { getCustomerBanners } from '../../api';
import { environment } from '../../env';

const HomePage = () => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        async function fetchBanners() {
            const res = await getCustomerBanners();
            // If API returns {data: [...]}, use res.data; else use res
            setBanners(res?.data || res || []);
        }
        fetchBanners();
    }, []);

    // Transform banners to slidesData format expected by HomeBanner
        // const slidesData = banners.map(banner => {
        //     let imageUrl = '';
        //     if (typeof banner.image === 'object' && banner.image.imageUrl) {
        //         imageUrl = `${environment.baseUrl}${banner.image.imageUrl}`;
        //     } else if (typeof banner.image === 'string') {
        //         imageUrl = banner.image.startsWith('http') ? banner.image : `${environment.baseUrl}${banner.image}`;
        //     } else if (banner.imageUrl) {
        //         imageUrl = banner.imageUrl.startsWith('http') ? banner.imageUrl : `${environment.baseUrl}${banner.imageUrl}`;
        //     }
        //     return {
        //         id: banner._id || banner.id,
        //         image: imageUrl,
        //         title: banner.title || banner.bannerTitle || '',
        //         description: banner.description || banner.bannerDescription || '',
        //         button: typeof banner.buttonText === 'string' ? banner.buttonText : '',
        //         background: true,
        //         onClick: () => banner.buttonLink ? window.open(banner.buttonLink, '_blank') : null
        //     };
        // });

        // Static demo slides data
        const slidesData = [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                title: "Guiding You Through Life with Vedic Wisdom",
                description: "Discover the ancient science of Vedic Astrology and unlock the secrets of your destiny. Our expert astrologers provide personalized readings, Kundli matching, and Vastu Shastra guidance to help you make informed decisions and live a harmonious life.",
                button: true,
                background: true,
                video: null,
                onClick: () => console.log("Slide 1 button clicked")
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                title: "Unlock Your Life's Purpose Through Vedic Astrology",
                description: "Experience the profound wisdom of ancient Indian astrology. Get detailed birth chart analysis, planetary remedies, and spiritual guidance tailored to your unique cosmic blueprint. Transform your life with authentic Vedic insights.",
                button: true,
                background: true,
                video: null,
                onClick: () => console.log("Slide 2 button clicked")
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                title: "Harmonize Your Space with Vastu Shastra",
                description: "Create positive energy flow in your home and workplace with ancient Vastu principles. Our certified consultants provide comprehensive Vastu analysis and practical solutions to enhance prosperity, health, and happiness in your life.",
                button: true,
                background: true,
                video: null,
                onClick: () => console.log("Slide 3 button clicked")
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                title: "Perfect Kundli Matching for Harmonious Marriage",
                description: "Ensure a blissful and compatible marriage with detailed Kundli matching and astrological compatibility analysis. Our expert astrologers evaluate Guna Milan, Mangal Dosha, and other important factors for a successful union.",
                button: true,
                background: true,
                video: null,
                onClick: () => console.log("Slide 4 button clicked")
            },
            {
                id: 5,
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2096&q=80",
                title: "Spiritual Guidance for Inner Peace",
                description: "Embark on a journey of self-discovery and spiritual growth. Our experienced spiritual guides help you find inner peace, overcome challenges, and align with your higher purpose through meditation, mantras, and sacred wisdom.",
                button: true,
                background: true,
                video: null,
                onClick: () => console.log("Slide 5 button clicked")
            }
        ];
    return (
        <div>
            <HomeBanner slidesData={slidesData} />
            <HomeCertifications />
            <HomeBestServices />
            <Testimonials />
            {/* <HomeFooter /> */}
        </div>
    )
}

export default HomePage
