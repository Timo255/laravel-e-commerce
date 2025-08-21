import React from "react";
import { Link } from "react-router-dom";
import fb from "/images/fb.png";
import tw from "/images/tw.png";
import ig from "/images/ig.png";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper-div">
        <div className="footer-details-div">
          <div className="footer-logo-details">
            <Link to={"/"} onClick={() => window.scroll(0,0)}>
              <div className="footer-logo">Logo</div>
            </Link>
            <p className="address">Lorem ipsum dolor sit amet consectetur.</p>
            <p className="tel">+123456789</p>
            <div className="email">lorem@gmail.com</div>
            <div className="footer-icons">
              <img src={fb} alt="" />
              <img src={tw} alt="" />
              <img src={ig} alt="" />
            </div>
          </div>

          <div id="contuct-us">
            <h1 className="contuct">CONTUCT US</h1>
            <p className="Ordering-payment">ORDERING & PAYMENT</p>
            <p className="Shipping">SHIPPING</p>
            <p className="Returns">RETURNS</p>
            <p className="Faq">FAQ</p>
            <p className="Sizing-guide">SIZING GUIDE</p>
          </div>

          <div id="About-us">
            <h1 className="about">ABOUT Us</h1>
            <p className="work-with-us">WORK WITH US</p>
            <p className="privacy">PRIVACY POLICY</p>
            <p className="terms">TERMS & CONDITIONS</p>
            <p className="enquiries">ENQUIRIES</p>
          </div>

          <div id="subscribe">
            <p className="subscribe-details">Subscribe to our newsletter</p>
            <div className="email-form">
              <input
                type="text"
                className="sbTex"
                placeholder="Email Address"
              />
              <button className="sbBtn">OK</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
