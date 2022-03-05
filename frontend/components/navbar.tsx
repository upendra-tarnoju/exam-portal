import React from "react";
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import Logo from "../assets/logo.png";
import styles from "./navbar.module.css";


function Navbar() {
  const navbarItemList: string[] = ['Login', 'Signup', 'Pricing'];

  return(
    <AppBar position="static">
      <Toolbar>
        <Image src={Logo} width={50} height={50} />
        <Typography variant="h6"  className={styles.logo}>Examin</Typography>
        <Box className={styles.navbarItems}>
          {navbarItemList.map((item, index) => (
            <Button className={styles.navItem} variant="text">{item}</Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;