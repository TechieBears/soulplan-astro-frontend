import HomeBanner from '../../components/HomeComponents/HomeBanner'
import HomeBestServices from '../../components/HomeComponents/HomeBestServices'
import HomeCertifications from '../../components/HomeComponents/HomeCertifications'
import Testimonials from '../../components/testimonial'

const HomePage = () => {
    return (
        <div>
            <HomeBanner
                image="https://via.placeholder.com/1920x1080"
                title="Welcome to Soulplan"
                description="Discover your spiritual journey with our comprehensive astrology services"
                button={true}
                background={true}
                onClick={() => console.log('Register clicked')}
            />

            <HomeCertifications />
            <HomeBestServices />
            <Testimonials />
            {/* <HomeFooter /> */}
        </div>
    )
}

export default HomePage
