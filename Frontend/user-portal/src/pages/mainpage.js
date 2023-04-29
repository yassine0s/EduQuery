import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";

const MainPage = () => {
  const handleClick = () => {
    window.location.href = "https://www.bme.hu/";
  };

  return (
    <div>
      <MDBContainer
        style={{ width: "90%", height: "90%", overflow: "auto" }}
        className="m-5 "
        breakpoint="sm"
      >
      
          <h2
            style={{
              fontSize: "34px",
              fontWeight: "bold",
            }}
          >
            News
          </h2>{" "}
        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem
            className="  d-block"
            itemId={1}
            style={{ height: "68vh", width: "150vh" }}
            src="../bme-news.jpg"
            alt="..."
          >
            <p
              style={{
                backgroundColor: "#E0E0E0",
                color: "black",
                font: "bold",
              }}
            >
              Registration is opened : Now you can start registering for subject
              through the Neptun site.
            </p>
            <MDBBtn
              onClick={handleClick}
              rounded
              className="text-dark"
              color="secondary"
            >
              Details
            </MDBBtn>{" "}
          </MDBCarouselItem>
          <MDBCarouselItem
            className="  d-block"
            itemId={2}
            style={{ height: "68vh", width: "150vh" }}
            src="../bme2.jpg"
            alt="..."
          >
            <p
              style={{
                backgroundColor: "#E0E0E0",
                color: "black",
                font: "bold",
              }}
            >
              Graduation date is set: You can find here all upcoming date
              concerning the Graduation.
            </p>{" "}
            <MDBBtn
              onClick={handleClick}
              rounded
              className="text-dark"
              color="secondary"
            >
              Details
            </MDBBtn>{" "}
          </MDBCarouselItem>
          <MDBCarouselItem
            className="  d-block"
            itemId={3}
            style={{ height: "68vh", width: "150vh" }}
            src="../bme3.jpg"
            alt="..."
          >
            <p
              style={{
                backgroundColor: "#E0E0E0",
                color: "black",
                font: "bold",
              }}
            >
              Bme sport center Now bme sport center is opened you can check
              details through this page
            </p>{" "}
            <MDBBtn
              onClick={handleClick}
              rounded
              className="text-dark"
              color="secondary"
            >
              Details
            </MDBBtn>{" "}
          </MDBCarouselItem>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default MainPage;
