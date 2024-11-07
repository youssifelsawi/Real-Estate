import React from "react";
import "../../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Property from "../Pages/Property/Property";
import Services from "../Pages/Services/Services";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Images/Logos/logo-2.png";

function Header() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-white shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#">
            <Link to="/">
              <img className="w-75" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0">
              <Link className="nav-link p-2 p-lg-3 active" to="/">
                Home
              </Link>
              <Link className="nav-link p-2 p-lg-3" to="/property">
                Property
              </Link>
              <Link className="nav-link p-2 p-lg-3" to="/services">
                Services
              </Link>
              <Link className="nav-link p-2 p-lg-3" to="/blog">
                Blog
              </Link>
              <Link className="nav-link p-2 p-lg-3" to="/aboutus">
                About Us
              </Link>
              <Link className="nav-link p-2 p-lg-3" to="/contactus">
                Contact Us
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/property" element={<Property />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Header;
