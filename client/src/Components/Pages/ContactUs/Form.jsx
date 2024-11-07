import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./ContactUs.css";
import { useState } from "react";

function Form() {
  const handleClick = () => {
    console.log("The Comment is: ", comment);
    // console.log(comment);
  };
  const [comment, setComment] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: "",
  });
  return (
    <>
      <div className="content ">
        <div className="container pt-5 ">
          <div className="row justify-content-around ">
            <div className="col-lg-7 bg-white p-4 mb-5 rounded-3">
              <h4 className="pb-2 fw-bold">Send Us An Email</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                amet. Nostrum nisi repellendus illo, placeat reprehenderit.
                Atque officiis modi esse! Nisi adipisci eum iusto qui magni
                quasi
              </p>
              <form className="row g-3">
                <div className="col-lg-6 mb-12">
                  <label
                    for=" exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Name"
                    onChange={(e) =>
                      setComment({ ...comment, Name: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 mb-12">
                  <label
                    for=" exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                    onChange={(e) =>
                      setComment({ ...comment, Email: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 mb-12">
                  <label
                    for=" exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="phone"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Phone"
                    onChange={(e) =>
                      setComment({ ...comment, Phone: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 mb-12">
                  <label
                    for=" exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Subject"
                    onChange={(e) =>
                      setComment({ ...comment, Subject: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  ></label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Your Message"
                    rows="6"
                    onChange={(e) =>
                      setComment({ ...comment, Message: e.target.value })
                    }
                  ></textarea>
                </div>
              </form>
              <submit className="btn" onClick={handleClick}>
                Send Massage
              </submit>
            </div>
            <div className="col-lg-4 bg-white p-4 mb-5 rounded-3">
              <h4 className="pb-2 fw-bold ">Contact Us </h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur ad vero ullam, nihil nulla unde .
              </p>
              <h4 className="m-0 pt-2 fw-bold">Address</h4>
              <p>2301 Ravenswood Rd Madsison , WI 35711</p>
              <h4 className="m-0 pt-2 fw-bold">Phone</h4>
              <p>(315) 905-2321</p>
              <h4 className="m-0 pt-2 fw-bold">Mail</h4>
              <p>info@findhouse.com</p>
              <h4 className="m-0 pt-2 fw-bold">Skype</h4>
              <p>findhouse.com</p>
              <h4 className="m-0 pt-2 fw-bold">Follow Us</h4>
              <ul className="list-unstyled ">
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#"></a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#"></a>
                </li>
                <li className="list-inline-item m-0">
                  <a className="text-decoration-none" href="#">
                    <i className="fab fa-dribbble"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
