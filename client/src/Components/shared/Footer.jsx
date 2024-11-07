import React from "react";
import "../../App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';



function Footer() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="main-footer">
                    <div className="coll">
                        <div className="widget">
                            <h4 className="widget-title">About Site</h4>
                            <p>
                                We're reimagining how you buy, sell, and rent. It's now easier
                                to get into a place you love. So let's do this, together.
                            </p>
                        </div>
                    </div>
                    <div className="coll">
                        <div className="widget">
                            <h4 className="widget-title">Quick Links</h4>
                            <a href="#">About Us</a> <br />
                            <a href="#">Terms & Conditions</a><br />
                            <a href="#">User's Guide</a><br />
                            <a href="#">Support Center</a><br />
                            <a href="#">Press Info</a>
                        </div>
                    </div>
                    <div className="coll">
                        <div className="widget">
                            <h4 className="widget-title">Contact Us</h4>
                            <a href="mailto:info@findhouse.com">info@findhouse.com</a><br />
                            <a href="#">Collins Street West, Victoria</a> <br />
                            <a href="#">8007, Australia.</a><br />
                            <a href="tel:+12463450699">+1 246-345-0699</a><br />
                            <a href="tel:+12463450695">+1 246-345-0695</a>
                        </div>
                    </div>
                    <div className="coll">
                        <div className="widget-menu widget">
                            <h4 className="widget-title">Follow Us</h4>
                            <div className="footer-social">
                                <ul>
                                    <li>
                                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-pinterest"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-dribbble"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="widget-title">Subscribe</h4>
                                <div className="widget">
                                    <input type="email" placeholder="Your email" className="footer_input" />
                                    <button type="submit" className="footer_sub_butt">
                                        <span> &#8250; </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-rights">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#">Home</a>
                            <a href="#">Listing</a>
                            <a href="#">Property</a>
                            <a href="#">About Us</a>
                            <a href="#">Blog</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="col">
                            <a>@ 2024 by company. All rights reserved.</a>
                            <button id="back-to-top" className="back-to-top">
                                <i className="fas fa-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
