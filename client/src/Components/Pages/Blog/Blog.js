import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Blog.css';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        setBlogPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="blog-section">
      <div className="container">
        <h5>
          <Link to='/' className="blog-home">Home</Link> / <span className="blog-text">Our Blog</span>
        </h5>
        <h2>Blog</h2>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div className="blog-post" key={index}>
              <img src={post.img} alt="Blog Post" />
              <div className="post-content">
                <span className={`tag ${post.category.toLowerCase()}`}>{post.category}</span>
                <h3>{post.title}</h3>
                <p>{new Date(post.date).toLocaleDateString()}</p>
                <p>{post.description}</p>
                <Link className="read-more" to={`/blogdetails`}>Read More &gt;</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <a href="#" className="prev">&laquo;</a>
          <span className="page-number">1</span>
          <span className="page-number active">2</span>
          <span className="page-number">3</span>
          <span className="page-number">...</span>
          <span className="page-number">29</span>
          <a href="#" className="next">&raquo;</a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
