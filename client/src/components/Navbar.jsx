import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Tab, Tabs} from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = useState('')
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">
          Blog App
        </Typography>
        <Box display = {'flex'} marginLeft = "auto" marginRight = 'auto'>
            <Tabs textColor='inherit' value={value} onChange={(e, val)=> setValue(val)}>
              <Tab label =  'Blogs' LinkComponent={Link} to = "/blogs" />
              <Tab label =  'My Blogs' LinkComponent={Link} to = "/my-blogs" />
            </Tabs>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button sx={{ margin: 1 }} color="inherit" LinkComponent={Link} to= "/login">
            Login
          </Button>

          <Button sx={{ margin: 1, color: "inherit"}}>
            Logout
          </Button>

          <Button sx={{ margin: 1, color: "inherit" }}  LinkComponent={Link} to= "/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;