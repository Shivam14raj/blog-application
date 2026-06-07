import { useState, useEffect } from "react";
import axios from "axios";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userID"); 

      if (!id) {
        console.log("No user ID found");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:4000/api/v1/blog/user/${id}` 
      );

    //   console.log("USER BLOGS 👉", data);

      if (data?.success) {
        setBlogs(data.blogs); 
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <div>
      <h1>User Blogs</h1>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <p key={blog._id}>{blog.title}</p>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default UserBlogs;