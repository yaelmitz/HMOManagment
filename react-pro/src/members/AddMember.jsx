import React from "react";
import { useState } from "react";
import { Card, CardContent, TextField, Button } from '@mui/material';
import axios from "axios";
import defaultimg from "../assets/defaultimg.png"
import "./members.css"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function AddMember(){
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const [isAdded,setIssAdded]=useState(false)
    const [formData, setFormData] = useState({
    id:null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
      city:null,
      street:null,
      buildingNumber:null,
      mobilePhone:null,
      phone:null,
      coronaDetails:null
  });
  const [formDataCorona,setFormDataCorona]=useState({
    id:null,
    getPositive:null,
    recoveryDate:null,
    vac1: {
        vaccinationDate:null,
        manufacturer:null
      },
      vac2: {
        vaccinationDate: null,
        manufacturer: null
      },
      vac3: {
        vaccinationDate: null,
        manufacturer: null
      },
      vac4: {
        vaccinationDate: null,
        manufacturer: null
      },
      hmoMember:{
          id:null
      }

  })
  const [img,setImg]=useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the value is empty, set it to null
    const newValue = value.trim() === '' ? null : value;
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

const handleImageChange = (e) => {
  setImg(e.target.files[0])
  console.log("targettt",e.target.files[0])
};
  const handleSubmit = (e) => {
    e.preventDefault();
console.log("i didddddddddd")
console.log(img)
   const formDataToSend = new FormData();
   if(img!=null)
   formDataToSend.append('image', img);
   formDataToSend.append('hmoMember', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    axios.post('http://localhost:8585/api/hmoMember/uploadHMOmember', formDataToSend)
      .then((response) => {
        console.log("member added:", response.data);
        setIssAdded(true)
      })
      .catch((error) => {
        console.log("error is:", error);
      });
    console.log('Form submitted:', formData);
    setFormData({
      id: null,
      firstName: null,
      lastName: null,
      dateOfBirth: null,
      city: null,
      street: null,
      buildingNumber: null,
      mobilePhone: null,
      phone: null,
      coronaDetails: null
    });
  };

 
const handleChangeCorona = (e) => {
    const { name, value } = e.target;
    const [parentField, subField] = name.split('.');
    if (subField) {
      setFormDataCorona(prevData => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [subField]: value
        }
      }));
    } else {
      setFormDataCorona(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  

  const handleSubmitCorona=(e)=>{
    e.preventDefault();
        axios.post('http://localhost:8585/api/coronaDetails/uploadCoronaDetails', formDataCorona)
          .then((response) => {
            console.log("corona details are added:", response.data);
          })
          .catch((error) => {
            console.log("error is:", error);
          });
        setFormData({
    getPositive:null,
    recoveryDate:null,
    vac1: {
        vaccinationDate:null,
        manufacturer:null
      },
      vac2: {
        vaccinationDate: null,
        manufacturer: null
      },
      vac3: {
        vaccinationDate: null,
        manufacturer: null
      },
      vac4: {
        vaccinationDate: null,
        manufacturer: null
      },
      hmoMember:{
          id:null
      }  
        });
      };
  
const style1={
    'margin':'5px'
}
    return(
        <>
        <div className="background2"></div>
    <React.Fragment>
        <Button variant="outlined" size="large" onClick={handleClickOpen} style={{position:'absolute',top:'40%',left:'43%',width:'200px'}}>
         {!isAdded? "Add new member":"Add corona details"} 
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
           Add member
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
            <Card >
      <CardContent>
        <form onSubmit={handleSubmit}>
        <TextField
            name="id"
            label="id"
            value={formData.id}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="dateOfBirth"
            label=" "
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            margin="normal"
          /> 
          <TextField
            name="city"
            label="city"
            value={formData.city}
            onChange={handleChange}
            margin="normal"
          />
            <TextField
            name="street"
            label="street"
            value={formData.street}
            onChange={handleChange}
            margin="normal"
          />
            <TextField
            name="buildingNumber"
            label="building number"
            value={formData.buildingNumber}
            onChange={handleChange}
            margin="normal"
          />
            <TextField
            name="mobilePhone"
            label="mobile phone"
            value={formData.mobilePhone}
            onChange={handleChange}
            margin="normal"
          />
            <TextField
            name="phone"
            label="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
          />  
          <TextField
          name="image"
          label=""
          type="file"
          value={formData.image}
          onChange={handleImageChange}
          margin="normal"
          />
          <br></br><br></br>
          <Button variant="contained" type="submit" autoFocus onClick={handleClose}>
            Add Member
          </Button>
        </form>
      </CardContent>
    </Card>
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Add member
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </React.Fragment>
      
     {isAdded&&( <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} style={{position:'absolute',left:'30%'}}>
          Add corona Detailes
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
           Add Corona details
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
            <Card >
      <CardContent >
        <form onSubmit={handleSubmitCorona}>
          <TextField style={style1}
            name="getPositive"
            label="getPositive"
            type="date"
            value={formDataCorona.getPositive}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          />
          <TextField style={style1}
            name="recoveryDate"
            label="recoveryDate"
            type="date"
            value={formDataCorona.recoveryDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          /><br></br>
          <TextField style={style1}
            name="vac1.vaccinationDate"
            label="vac1.vaccinationDate"
            type="date"
            value={formDataCorona.vac1.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          /> 
          <TextField style={style1}
            name="vac1.manufacturer"
            label="vac1.manufacturer"
            type="text"
            value={formDataCorona.vac1.manufacturer}
            onChange={handleChangeCorona}
            margin="normal"
          />
             <TextField style={style1}
            name="vac2.vaccinationDate"
            label="vac2.vaccinationDate"
            type="date"
            value={formDataCorona.vac2.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          /> 
          <TextField style={style1}
            name="vac2.manufacturer"
            label="vac2.manufacturer"
            type="text"
            value={formDataCorona.vac2.manufacturer}
            onChange={handleChangeCorona}
            margin="normal"
          />
          <TextField style={style1}
            name="vac3.vaccinationDate"
            label="vac3.vaccinationDate"
            type="date"
            value={formDataCorona.vac3.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          /> 
          <TextField style={style1}
            name="vac3.manufacturer"
            label="vac3.manufacturer"
            type="text"
            value={formDataCorona.vac3.manufacturer}
            onChange={handleChangeCorona}
            margin="normal"
          />
          <TextField style={style1}
            name="vac4.vaccinationDate"
            label="vac4.vaccinationDate"
            type="date"
            value={formDataCorona.vac4.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleChangeCorona}
            margin="normal"
          /> 
          <TextField style={style1}
            name="vac4.manufacturer"
            label="vac4.manufacturer"
            type="text"
            value={formDataCorona.vac4.manufacturer}
            onChange={handleChangeCorona}
            margin="normal"
          />
          <TextField style={style1}
            name="hmoMember.id"
            label="hmoMember.id"
            type="text"
            value={formDataCorona.hmoMember.id}
            onChange={handleChangeCorona}
            margin="normal"
          />

          <br></br><br></br>
          <Button variant="contained" type="submit" autoFocus onClick={handleClose}>
            Add Corona details
          </Button>
        </form>
      </CardContent>
    </Card>
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Add member
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </React.Fragment>)}

        </>
    )
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
   
    
  
     