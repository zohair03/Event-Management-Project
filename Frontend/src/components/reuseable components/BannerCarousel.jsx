import React, { useState } from "react";
import Slider from "react-slick";

const BannerCarousel = ({ recentEventBanners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        <div className="bannerCdiv">
          <img src={recentEventBanners[0]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[1]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[2]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[3]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[4]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[5]} alt="Banner" />
        </div>
        <div className="bannerCdiv">
          <img src={recentEventBanners[6]} alt="Banner" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerCarousel;
