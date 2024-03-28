import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";


export default function MemberDet() {
  const [myMember, setMyMember] = useState();
 // const { id } = useParams(); // Get id from URL params

  useEffect(() => {
   // console.log("idddd" ,id)
    axios.get("http://localhost:8585/api/hmoMember/getById/6")
      .then((response) => {
        console.log("response data is:", response.data);
        setMyMember(response.data);
      })
      .catch((error) => {
        console.log("the error is:", error);
      });
  }, []); // Make sure to include id in dependency array

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
<React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          member id: 6
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
             {myMember&&myMember.id}  {myMember&&myMember.dateOfBirth}
          </Typography>
          <Typography gutterBottom>
            {myMember&&myMember.firstName}{myMember&&myMember.lastName}
          </Typography>
          <Typography gutterBottom>
            {myMember&&myMember.street}   {myMember&&myMember.buildingNumber}   {myMember&&myMember.city}
          </Typography>
          <Typography gutterBottom>
            {myMember&&myMember.mobilePhone}  {myMember&&myMember.phone}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    </> 
  );
}


 
