import { ArrowRight } from 'iconsax-reactjs';
import { useNavigate } from 'react-router-dom';
import curly from "../../assets/services/carddesign.png";

const ServicesCard = ({ service, idx }) => {
    const navigate = useNavigate();

    const handleServiceClick = () => {
        if (service.name) {
            navigate(`/services/${service.name?.toLowerCase()}`, {
                state: {
                    serviceData: {
                        ...service
                    }
                }
            });
            window.scrollTo(0, 0, { behavior: "smooth" });
        }
    };

    return (
        <div
            key={idx}
            className="bg-[#FFF9EF] rounded-lg border border-gray-200 overflow-hidden text-center p-3 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-300 ease-in-out flex flex-col"
            onClick={handleServiceClick}
            style={{ minHeight: '350px' }}
        >
            {service.image && (
                <img
                    src={service.image}
                    alt={service.name}
                    loading="eager"
                    className="w-full h-44 object-cover rounded-lg bg-slate1"
                />
            )}
            <h3 className="mt-4 text-xl font-medium font-tbLex line-clamp-1">{service.name || ""}</h3>
            <img
                className="mx-auto w-28 h-8 object-fit rounded-md"
                src={curly}
                alt="divider"
            />
            <p className="text-slate-500 mt-2 px-4 text-sm font-tbPop font-medium tracking-tight line-clamp-2 flex-grow">{service.subTitle || ""}</p>
            <span className="mt-3 inline-block text-black text-lg self-center pb-4">
                <ArrowRight size={20} weight="bold" />
            </span>
        </div>
    )
}

export default ServicesCard
