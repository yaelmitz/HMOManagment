import React from "react";
import "./header.css"
import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer(){
    return(
        <>
         <div className="footer">
                  {/* <FacebookRoundedIcon size="large" style={{margin:'1%',color:'white',}}></FacebookRoundedIcon>
                  <InstagramIcon style={{margin:'1%',color:'white'}}></InstagramIcon> */}
            <h5 style={{color:'white',fontSize:'large'}}>all rights reserved to HMO Y.M</h5>
              <CopyrightIcon style={{color:'white'}}></CopyrightIcon> 
         </div>
        </>
    )
    }