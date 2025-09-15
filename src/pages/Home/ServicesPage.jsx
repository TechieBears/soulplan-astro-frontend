"use client";
import React from "react";
import service1 from "../../assets/services/service1.png";
import service2 from "../../assets/services/service2.png";
import service3 from "../../assets/services/service3.png";
import service4 from "../../assets/services/service4.png";
import service5 from "../../assets/services/service5.png";
import service6 from "../../assets/services/service6.png";
import service7 from "../../assets/services/service7.png";
import service8 from "../../assets/services/service8.png";
import service9 from "../../assets/services/service9.png";
import service10 from "../../assets/services/service10.png";
import service11 from "../../assets/services/service11.png";
import service12 from "../../assets/services/service12.png";
import service13 from "../../assets/services/service13.png";
import service14 from "../../assets/services/service14.png";
import service15 from "../../assets/services/service15.png";
import service16 from "../../assets/services/service16.png";

import curly from "../../assets/services/carddesign.png";
import corner1 from "../../assets/services/corner1.png";
import underline from "../../assets/undertext.png";
import Breadcrumbs from "../../components/breadcrum";
import Testimonials from "../../components/testimonial";
import HomeBestServices from "../../components/HomeComponents/HomeBestServices";
import { ListMinus } from "lucide-react";


const ServicesPage = () => {
  return (
    <>
    <div className="container bg-[#fff9f5] mx-auto px-4">
      <Breadcrumbs />
  <HomeBestServices limit={16} showCorners={false} showbestservicetext={false} />
    </div>
    <Testimonials/>
    </>
  );
};

export default ServicesPage;
