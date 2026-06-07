import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {authActions} from '../redux/store.jsx'

const Login = () => {
  // we made variable because these are hooks 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email: input.email,
          password: input.password
        }
      );

      if (data.success) {
        dispatch(authActions.login()); 
        alert("Login successful");
        navigate("/"); 
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="auto"
      marginTop={5}
    >
      <Typography variant="h5">Login Page</Typography>

      <TextField
        name="email"
        label="Email"
        value={input.email}
        onChange={handleChange}
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        value={input.password}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained">
        Login
      </Button>

      <Button onClick={() => navigate("/register")}>
        New user? Register here
      </Button>
    </Box>
  );
};

export default Login;