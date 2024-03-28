import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import "./header.css"
export default function Header(){
const pages = ['homePage','members','corona'];
return(
<>
  
  <div className="header">
    {pages.map((page) => (
      <Button  
        key={page} 
        component={Link} 
        to={`/${page}`} 
        style={{position: "inherit", top: "0px",color:'white'}}
        
        //onClick={handleCloseNavMenu}
      >
        {page}
      </Button>
    ))}
    </div>
</>)
}