import React from 'react'
import HomeBanner from '../../components/HomeComponents/HomeBanner'
import HomeFooter from '../../components/HomeComponents/HomeFooter'
import HomeBestServices from '../../components/HomeComponents/HomeBestServices'
import HomeCertifications from '../../components/HomeComponents/HomeCertifications'
import HomeGooglePlay from '../../components/HomeComponents/HomeGooglePlay'

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
            <HomeGooglePlay />
            <HomeBestServices/>
            {/* <HomeFooter /> */}
        </div>
    )
}

export default HomePage
