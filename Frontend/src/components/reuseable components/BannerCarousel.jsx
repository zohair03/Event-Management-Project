import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./BannerCarousel.css";

const BannerCarousel = ({ recentEventBanners }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: () => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    afterChange: () => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
  };

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        {recentEventBanners.map((banner, idx) => (
          <div className="bannerCdiv" key={idx} tabIndex={-1}>
            <div
              className="innerBannerCdiv"
              style={{
                backgroundImage: `url(${banner.eBan})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="innerDetailsDiv">
                <div
                  style={{
                    backgroundImage: `url(${banner.eBan})`,
                    backgroundClip: "text",
                  }}
                >
                  <h1
                    onClick={() => {
                      navigate(`/events/${banner.id}/${banner.cat}`, {
                        state: { id: banner.id, category: banner.cat },
                      });
                    }}
                  >
                    {banner.eName}
                  </h1>
                  <p className="hostName">By {banner.eHost}</p>
                  <p
                    style={{
                      display: "flex",
                      gap: "2px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/icons/location.svg"
                      width={24}
                      height={24}
                    />{" "}
                    {banner.eLocation}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      gap: "2px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                    />{" "}
                    {banner.eStartDate.slice(0, 11)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
