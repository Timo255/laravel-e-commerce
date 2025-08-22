import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import leftArrow from "/images/left.png";
import rightArrow from "/images/right arrow.png";
import useAuth from "../hooks/useAuth";

const Slider = () => {
  const [productsSlider, setProductsSlider] = useState();
  const [slideIndex, setSlideIndex] = useState(1);
  const { setLoading } = useAuth();

  useEffect(() => {
    const getSliderProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_APIURL}/api/sliderProducts`
        );
        console.log("slider : ", data?.prds);
        setProductsSlider(data?.prds);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getSliderProducts();
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex === productsSlider?.length) {
        setSlideIndex(1);
      } else {
        setSlideIndex(slideIndex + 1);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  const nextSliderImg = () => {
    if (slideIndex !== productsSlider?.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === productsSlider?.length) {
      setSlideIndex(1);
    }
  };

  const prevSliderImg = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(productsSlider?.length);
    }
  };

  return (
    <div id="advert-div">
      <div className="wrapper-div">
        <div className="slider">
          {productsSlider &&
            productsSlider.map((slide, index) => (
              <div
                key={slide.uuid}
                className={`advert-content-img ${
                  slideIndex === index + 1 ? "slide current" : "slide"
                }`}
              >
                <div className="advert-content">
                  <p className="header">{slide.nameShop}</p>
                  <p className="advert-details">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br /> Qui amet quasi numquam voluptatibus ratione,
                    <br />
                    illo aliquid, nulla voluptas veniam eius et?
                  </p>
                  <Link
                    to={`/shop/${slide.uuid}`}
                    onClick={() => window.scroll(0, 0)}
                  >
                    <button id="buyNow">Buy Now</button>
                  </Link>
                </div>
                <div className="advert-img">
                  <img
                    src={`${import.meta.env.VITE_APIURL}/images/${
                      slide.imgLg439
                    }`}
                    alt=""
                    srcSet={`${import.meta.env.VITE_APIURL}/images/${
                      slide.imgLg439
                    } 439w,
                               ${import.meta.env.VITE_APIURL}/images/${
                      slide.imgMd309
                    } 209w,
                               ${import.meta.env.VITE_APIURL}/images/${
                      slide.imgMd360
                    } 360w`}
                    sizes="(max-width: 480px) 360px,
                                (max-width: 1024px) 309px, 439px"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="arrows">
        <img
          onClick={prevSliderImg}
          src={leftArrow}
          alt=""
          className="left-arrow"
        />
        <img
          onClick={nextSliderImg}
          src={rightArrow}
          alt=""
          className="right-arrow"
        />
      </div>
    </div>
  );
};

export default Slider;
