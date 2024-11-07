import React from "react";
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import blogimg from '../../../Images/blog-image.jpg'


function BlogDetailsSection() {

  return (
    <>
      <section className="blog-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-text">
                <Link to="/">Home / </Link>
                <span>Single Blog</span>
                <h3>Blog Details</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-article">
                <div className="blog-header">
                  <p>Construction</p>
                </div>
                <p className="blog-title">
                  Redfin Ranks The Most Competitive Neighborhoods of 2020
                </p>
                <div className="blog-date">
                  <i className="fa-regular fa-calendar"></i>
                  <p>January 16, 2020</p>
                </div>
                <div className="blog-image">
                  <img src={blogimg} alt="Blog" />
                </div>
                <div className="blog-text">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Culpa ea praesentium suscipit odit doloremque porro et
                    vitae, id optio quia error illo molestiae. Eaque temporibus,
                    dolor pariatur quia magnam saepe.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae dolorum reiciendis assumenda harum natus incidunt
                    dicta, alias nisi fugiat, explicabo quam, fugit ea quos iste
                    sequi quas. Sapiente, veniam magnam? Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Iste id assumenda
                    excepturi corrupti reiciendis ratione dolore cumque, in
                    maiores officia doloribus veritatis? Nobis recusandae at,
                    sit placeat alias id ut?
                  </p>
                  <p className="text-title">
                    Housing Markets That Changed The Most This Decade
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae ipsa dolores quasi reiciendis reprehenderit? Fugiat
                    adipisci labore nulla. Possimus expedita veniam dolores,
                    omnis accusamus maxime quia ipsum enim nulla voluptate.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde corrupti quia ullam cum autem eum hic esse qui.
                    Asperiores, ab. Sint provident voluptatibus unde quam
                    pariatur nihil, rerum distinctio dolorem!
                    <br />
                    <br />
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio ab illum qui! Obcaecati ipsam similique possimus
                    ullam, tempora, repellendus aspernatur explicabo quas fuga
                    ratione, velit vitae sequi illo ab sapiente. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Accusamus
                    deserunt distinctio, eos maiores eaque minima dicta
                    provident, rem illum neque cumque temporibus dolore aperiam
                    voluptas officia omnis at ut sed.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum beatae sequi repudiandae cumque, rem molestias quaerat
                    dolorum nesciunt dignissimos, aliquam, facilis fuga ipsa
                    excepturi! Odio, ipsum iste? Reprehenderit, animi ipsam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetailsSection;
