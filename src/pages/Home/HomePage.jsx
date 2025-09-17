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
            image: "https://res.cloudinary.com/astroguid/image/upload/v1758019720/image2_chhr4p.jpg",
            title: `its time to choose your right soul plan for your better future`,
            description: `Talk to our experienced As Astrologer The Best in Astrology and get right solutions for your problems`,
            button: true,
            background: true,
            video: null,
            onClick: () => console.log("Slide 1 button clicked")
        },
        {
            id: 2,
            image: "https://res.cloudinary.com/astroguid/image/upload/v1758019719/image3_flhz58.jpg",
            title: "Unlock Your Life's Purpose Through Vedic Astrology",
            description: "Experience the profound wisdom of ancient Indian astrology. Get detailed birth chart analysis, planetary remedies, and spiritual guidance tailored to your unique cosmic blueprint. Transform your life with authentic Vedic insights.",
            button: true,
            background: true,
            video: null,
            onClick: () => console.log("Slide 2 button clicked")
        },
        {
            id: 3,
            image: "https://res.cloudinary.com/astroguid/image/upload/v1758019718/image1_g3yax9.jpg",
            title: "Harmonize Your Space with Vastu Shastra",
            description: "Create positive energy flow in your home and workplace with ancient Vastu principles. Our certified consultants provide comprehensive Vastu analysis and practical solutions to enhance prosperity, health, and happiness in your life.",
            button: true,
            background: true,
            video: null,
            onClick: () => console.log("Slide 3 button clicked")
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
