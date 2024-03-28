import React from "react";
import { Container, Typography, Button } from '@mui/material';
import "./homePage.css"
import { Link } from "react-router-dom";
import Members from "../members/Members";
import { blue } from "@mui/material/colors";

export default function HomePage(){
const page='members'
    return(
    <>
    <div className="background">
    </div>
    <div className="hero-text"> HMO Management <br></br> System</div>
    <div style={{
      position: 'fixed',
      top: '58%',
      left: '25%',
    }}><Button  
        key={page} 
        component={Link} 
        to={`/${page}`} 
        style={{position: "inherit"}}
        variant="contained"
      >
        get started
      </Button></div>
    </>
    )
}