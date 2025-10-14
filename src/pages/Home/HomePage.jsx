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
      {/* <HomeFooter /> */}
<div className="fixed bottom-6 right-5 z-50">
  <div className="absolute -inset-2 rounded-full bg-green-500 opacity-20 animate-ping"></div>
  <div className="absolute -inset-2 rounded-full bg-green-500 opacity-15 animate-ping animation-delay-1000"></div>
  <div className="absolute -inset-2 rounded-full bg-green-500 opacity-10 animate-pulse"></div>
  
  <a
    href="https://wa.me/918693000000"
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-700 ease-out h-14 w-14 hover:w-48 group overflow-hidden hover:scale-105 ring-2 ring-white ring-opacity-20"
    aria-label="Contact us on WhatsApp"
  >
    <svg
      className="w-6 h-6 absolute transition-opacity duration-300 group-hover:opacity-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411" />
    </svg>

    <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
      +91 86930 00000
    </span>
  </a>
</div>    </>
  );
};

export default HomePage;
