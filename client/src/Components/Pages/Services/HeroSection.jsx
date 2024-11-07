import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import heroimg from '../../../Images/overlayed-image.jpg'

function HeroSection() {

  return (
    <>
      <section className="overlayed-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="overlayed-image">
                <img src={heroimg} alt="Services" />
                <div className="image-overlay">
                  <div className="overlay-text">
                    <Link to="/">Home /</Link>
                    <span> Service</span>
                    <h2>Service</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
