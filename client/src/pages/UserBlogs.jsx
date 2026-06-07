import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";

const DEFAULT_IMAGE =
  "https://via.placeholder.com/600x300?text=No+Image";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userID");

      if (!id) return;

      const { data } = await axios.get(
        `http://localhost:4000/api/v1/blog/user/${id}`
      );

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
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        My Blogs
      </Typography>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card
            key={blog._id}
            sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}
          >
            {/* IMAGE */}
            <CardMedia
              component="img"
              height="90"
              image={blog.image || DEFAULT_IMAGE}
              alt={blog.title}
            />

            <CardContent>
              {/* HEADER */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "red", mr: 2 }}>
                  {blog.title?.charAt(0).toUpperCase()}
                </Avatar>

                <Box>
                  <Typography variant="h6">
                    {blog.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(blog.createdAt).toDateString()}
                  </Typography>
                </Box>
              </Box>

              {/* DESCRIPTION */}
              <Typography variant="body2">
                {blog.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No blogs found</Typography>
      )}
    </Box>
  );
};

export default UserBlogs;