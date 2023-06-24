import React from "react";
import Carousel from "react-bootstrap/Carousel";
import home_carousel_One from "./Assest/home_carousel_One.jpg";
import home_carousel_Two from "./Assest/home_carousel_Two.jpg";
import home from "./Assest/home.jpg";

const Landing = () => {
  return (
    <>
      {/* // <div className="container "> */}

      <div className="jumbotron  jumbotron-fluid">
        <div className="containerMain">
          <h1 className="text-center headerMain ">
            RENT / <span className="headerMid">BUY </span>/ SELL
          </h1>
        </div>

        {/* Carousel Start */}
        <Carousel className=" col-sm-8 mx-auto">
          <Carousel.Item>
            <img className="d-block w-100" src={home} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={home_carousel_One}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={home_carousel_Two}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        {/* Carousel End */}
      </div>
      {/* </div> */}
    </>
  );
};

export default Landing;
