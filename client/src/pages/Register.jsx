import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try { 
      // now send network request to backend 
     const {data} =  await axios.post('http://localhost:4000/api/v1/user/register', {username: input.username, email: input.email, password: input.password})
     if(data.success){
        alert('register successfull')
        navigate('/login')
     } 
     
     
    } catch (error) {
      console.log(error)
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
      <Typography variant="h5">Register Page</Typography>

      <TextField
        name="username"
        label="Username"
        value={input.username}
        onChange={handleChange}
      />

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
        Submit
      </Button>

      <Button onClick={() => navigate("/login")}>
        Already registered? Please Login
      </Button>
    </Box>
  );
};

export default Register;