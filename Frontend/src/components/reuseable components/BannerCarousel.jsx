import React from "react";
import Slider from "react-slick";

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/b1.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/b2.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/b3.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/b4.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/b5.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/d2.jpg" alt="" />
        </div>
        <div className="bannerCdiv">
          <img src="/assets/images/homePageBanners/d1.jpg" alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerCarousel;
