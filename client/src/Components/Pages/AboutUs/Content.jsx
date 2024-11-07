import React from "react";
import "./AboutUs.css";
import image from "../../../Images/Other/Screenshot 2024-08-30 150902.png";
function Content() {
  return (
    <>
      <div className="about-us pb-5">
        <div className="container">
          <div className="about-content">
            <div className="text">
              <h5>
                Mauris as consectetur ante , dapibus gravida tollud. Nullam
                aliquet dpapibud cres sagittis ex euismod lacinia tempor{" "}
              </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elitamet
                consectetur amet consectetur adipisicing elit amet consectetur
                adipisicing elit adipisicing elit. Nihil mollitia fuga, quidem
                amet consectetur adipisicing elitdebitis porro magnam sint amet
                facere ipsam assumenda sed, quaerat numquam tempore aliquam,
                ipsa praesentium reprehenderit dolores consectetur?
              </p>
              <p>
                Lorem ipsum dolor sitamet consecteturamet consectetur amet
                consectetur adipisicing elit adipisicing elit adipisicing elit
                amet consectetur adipisicing elit. Nihil mollitia fuga, quidem
                debitis porro magnam amet consectetur adipisicing elitsint amet
                facere ipsam assumenda sed, quaerat numquam tempore aliquam,
                ipsa praesentium reprehenderit dolores consectetur?
              </p>
            </div>
            <div className="image">
              <img src={image} alt="This is image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
