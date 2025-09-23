import HomeBanner from "../../components/HomeComponents/HomeBanner";
import HomeBestServices from "../../components/HomeComponents/HomeBestServices";
import HomeCertifications from "../../components/HomeComponents/HomeCertifications";
import Testimonials from "../../components/testimonial";
import { useEffect, useState } from "react";
import { getActiveBanners, getPublicServices } from "../../api";
import { environment } from "../../env";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
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
              window.location.href = '/';
            },
            onImageError: (e) => {
              console.error("Image failed to load:", finalImageUrl);
              console.error("Error event:", e);
            },
          };
        })
      );
      setSlidesData(formattedSlides);

    };

    fetchSlides();
  }, []);

  return (
    <div>
      <HomeBanner slidesData={slidesData} />
      <HomeCertifications />
      <HomeBestServices />
      <Testimonials />
      {/* <HomeFooter /> */}
    </div>
  );
};

export default HomePage;
