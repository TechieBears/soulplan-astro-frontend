import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicServices } from "../../api";
import corner1 from "../../assets/services/corner1.png";
import underline from "../../assets/undertext.png";
import { formBtn3 } from "../../utils/CustomClass";
import ServicesCard from "../Cards/ServicesCard";

export default function HomeBestServices() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await getPublicServices({ p: 1, records: 10, search: '', category: '' });
            setServices(response?.data || []);
        }
        fetchServices();
    }, []);

    return (
        <section className="py-16 !bg-[#FFF9EF] relative">
            <>
                <img src={corner1} alt="corner" className="absolute top-0 left-0 w-16 md:w-20 xl:w-24" />
                <img
                    src={corner1}
                    alt="corner"
                    className="absolute top-0 right-0 w-16 md:w-20 xl:w-24 rotate-90"
                />
            </>

            {/* Heading */}
            <div className="text-center mb-12">
                <>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold  text-center leading-snug">
                        <span className="text-p">Our Best Services</span>
                    </h2>
                    <img
                        src={underline}
                        alt="Underline"
                        className="w-40 md:w-56 h-10 mt-3 mx-auto"
                    />
                </>
            </div>

            {/* Grid */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 xl:px-0">
                {services.slice(0, 10).map((service, idx) => (
                    <ServicesCard service={service} idx={idx} />
                ))}
            </div>


            {/* Button */}
            <div className="text-center  justify-self-center mt-12">
                <button
                    className={` ${formBtn3}`}
                    onClick={() => navigate('/services')}
                >
                    View All Services
                </button>
            </div>
            <img
                src={corner1}
                alt="corner"
                className="absolute bottom-0 left-0 w-24 -rotate-90"
            />
            <img
                src={corner1}
                alt="corner"
                className="absolute bottom-0 right-0 w-24 rotate-180"
            />

        </section>
    );
}
