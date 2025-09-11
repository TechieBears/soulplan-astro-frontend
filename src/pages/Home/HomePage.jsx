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
    const slidesData = banners.map(banner => {
        let imageUrl = '';
        if (typeof banner.image === 'object' && banner.image.imageUrl) {
            imageUrl = `${environment.baseUrl}${banner.image.imageUrl}`;
        } else if (typeof banner.image === 'string') {
            imageUrl = banner.image.startsWith('http') ? banner.image : `${environment.baseUrl}${banner.image}`;
        } else if (banner.imageUrl) {
            imageUrl = banner.imageUrl.startsWith('http') ? banner.imageUrl : `${environment.baseUrl}${banner.imageUrl}`;
        }
        return {
            id: banner._id || banner.id,
            image: imageUrl,
            title: banner.title || banner.bannerTitle || '',
            description: banner.description || banner.bannerDescription || '',
            button: typeof banner.buttonText === 'string' ? banner.buttonText : '',
            background: true,
            onClick: () => banner.buttonLink ? window.open(banner.buttonLink, '_blank') : null
        };
    });

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
