import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Tab, Tabs } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {authActions} from '../redux/store.jsx'
// import { logout } from your redux slice (example)

const Navbar = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [value, setValue] = useState(false);

  const handleLogout = () => {
    // dispatch(logout());
    console.log("logout clicked");
    try { 
      dispatch(authActions.logout()); 
      alert('logout successful')
      navigate('/login') 

    } catch (error) {
      console.log(error)
    }
  };  

  return (
    <AppBar position="sticky">
      <Toolbar>

        <Typography variant="h4">
          Blog App
        </Typography>

        {/* LEFT CENTER TABS (ONLY WHEN LOGGED IN) */}
        {isLogin && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
            </Tabs>
          </Box>
        )}

        {/* RIGHT SIDE AUTH BUTTONS */}
        <Box sx={{ marginLeft: "auto" }}>

          {!isLogin && (
            <>
              <Button sx={{ margin: 1 }} color="inherit" component={Link} to="/login">
                Login
              </Button>   

              <Button sx={{ margin: 1 }} color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {isLogin && (
            <Button
              sx={{ margin: 1 }}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;