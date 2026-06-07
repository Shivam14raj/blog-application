import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  InputLabel,
  TextField,
} from "@mui/material";

const CreateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userID = localStorage.getItem("userID");

      if (!userID) {
        alert("User not logged in");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: userID,
        }
      );

      if (data.success) {
        alert("Blog created successfully 🎉");
        setInputs({
          title: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width="60%"
        border={2}
        borderRadius={5}
        padding={3}
        margin="auto"
        marginTop={5}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h4" textAlign="center">
          Create Blog
        </Typography>

        <InputLabel>Title</InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          required
        />

        <InputLabel>Description</InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />

        <InputLabel>Image URL (optional)</InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Create Blog
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;