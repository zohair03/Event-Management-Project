import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerDiv">
          <div className="navbarLogo">
            <Link to="/" className="navbartext">
              <div className="EventlyLogo">
                <img
                  src="/assets/icons/EventLogo3.svg"
                  alt="EventlyLogo"
                  width={40}
                  height={40}
                />{" "}
                <h2 style={{"margin":"0px"}}>Evently</h2>
              </div>
            </Link>
          </div>
          <p>2025 Zohair Ahmed all right reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
