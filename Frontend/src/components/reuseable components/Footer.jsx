import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footercontact">
          <div>
            <p>Zohair Ahmed</p>
            <p>zohairrahmed03@gmail.com</p>
          </div>
          <div>
            <p>Contact me</p>
            <div className="sec">
              <a href="https://github.com/zohair03" target="_blank">
                <img
                  src="/assets/icons/github.svg"
                  alt="GitHub"
                  width={35}
                  height={35}
                />
                @zohair03
              </a>
              <a
                href="https://www.linkedin.com/in/zohair-ahmed-shaikh"
                target="_blank"
              >
                <img
                  src="/assets/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={35}
                  height={35}
                />
                @zohair-ahmed-shaikh
              </a>
            </div>
          </div>
        </div>

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
                <h2 style={{ margin: "0px" }}>Evently</h2>
              </div>
            </Link>
          </div>

          <p>© 2025 all right reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
