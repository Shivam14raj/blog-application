import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogReviewCard from "../components/BlogCard.jsx";

const Blog = () => {
  const [Blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/blog/all-blogs"
      );
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {Blogs.length > 0 ? (
        Blogs.map((blog) => (
          <BlogReviewCard key={blog._id} blog={blog} />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No blogs found</p>
      )}
    </div>
  );
};

export default Blog;