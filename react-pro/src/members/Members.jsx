import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import "./members.css"
import Icon from '@mdi/react';
import { mdiAccountMultiplePlusOutline } from '@mdi/js';
import AddMember from "./AddMember";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { mdiDeleteForever } from '@mdi/js';
import defaultimg from "../assets/defaultimg.png"
import CoronaDet from "../corona/CoronaDet";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Members() {
  const [myMembers, setMyMembers] = useState([]);
  const [openDialogIndex, setOpenDialogIndex] = useState(-1); // Index of the open dialog
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedMember, setUpdatedMember] = useState({
    id:null,
    firstName:null,
    lastName: null,
    dateOfBirth:null,
    city: null,
    street: null,
    buildingNumber:null,
    phone: null,
    mobilePhone: null,
    image: "",
    coronaDetails:{

    }
  });
 const [updateCorona,setUpdateCorona]=useState(
  {
    getPositive:null,
    recoveryDate:null,
    vac1: {
      vaccinationDate:null,
      manufacturer:null
    },
    vac2: {
      vaccinationDate:null,
      manufacturer:null
    },
    vac3: {
      vaccinationDate: null,
      manufacturer:null
    },
    vac4: {
      vaccinationDate: null,
      manufacturer:null
    },
    hmoMember:{
        id:null
    }
})
const add='addMember'
const [dialogOpen, setDialogOpen] = useState(true);
const [img,setImg]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:8585/api/hmoMember/getAllHmoMebers')
      .then((response) => {
        console.log("response data is:", response.data);
        setMyMembers(response.data);
      })
      .catch((error) => {
        console.log("the error is:", error);
      });
  }, []);

  const handleOpenDialog = (index) => {
    setOpenDialogIndex(index);
    // Reset updatedMember state to show member details initially
    setUpdatedMember(myMembers[index]);
    setUpdateCorona(myMembers[index].coronaDetails)
  };

  const handleCloseDialog = () => {
    setOpenDialogIndex(-1);
  };

  const handleUpdateClick = () => {
    setIsUpdating(true); // Enable update mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

//   const handleInputCorChange=(e)=>{
//     const { name, value } = e.target;
//     setUpdateCrona((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   }

const handleInputCorChange = (e) => {
    const { name, value } = e.target;
    const [parentField, subField] = name.split('.');
    if (subField) {
      setUpdateCorona(prevData => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [subField]: value
        }
      }));
    } else {
      setUpdateCorona(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  const handleImageChange = (e) => {
    setImg(e.target.files[0])
  };
    const handleSaveMember = (id, updatedData , id2 , updatedCorona) => {
        console.log("Updated member data:", updatedData);
        const formDataToSend = new FormData();
        formDataToSend.append('image', img);
        formDataToSend.append('hmoMember', new Blob([JSON.stringify(updatedData)], { type: 'application/json' }));
        axios.put(`http://localhost:8585/api/hmoMember/updateMmber/${id}`, formDataToSend)
          .then((response) => {
            console.log("this is the updated member", response.data)
          })
          .catch((error) => {
            console.log("the error is:", error);
          });
          if(updatedCorona){
          axios.put(`http://localhost:8585/api/coronaDetails/updateCoronaDetails/${id2}`,updatedCorona)
           .then((response)=>{
            console.log("this is updated corona: ",response.data)
           })
           .catch((error)=>{
             console.log(error)
           }
           )
      }};
      
      const handleDelete=(id)=>{
    //     if(id2){
    //   axios.delete(`http://localhost:8585/api/coronaDetails/deleteCoronaById/${id2}`)
    //   .then(()=>{
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })}
        axios.delete(`http://localhost:8585/api/hmoMember/deleteById/${id}`)
        .then(()=>{
        })
        .catch((error)=>{
            console.log(error)
        })
        setDialogOpen(false)
      }
      
  return (
    <>
    <Button style={{left:'27%',top:'17%',position:'absolute'}}
            key={add} 
            component={Link} 
            to={`/${add}`} >
        <Icon path={mdiAccountMultiplePlusOutline} size={3} />
        </Button>
      <h1 className="myh1">Members:</h1>
      <div style={{marginTop:'100px'}}></div>
      {myMembers.map((myMember, index) => (
        <div key={myMember.id}  
         style={{alignItems: 'center',display:'flex',fontSize:'150%',margin:'10px'}} >
         {myMember.image?<Avatar src={`data:image/jpg;base64,${myMember.image}`} style={{margin:'13px'}}></Avatar>
         :<Avatar src={defaultimg} style={{margin:'13px'}}></Avatar>}
         {myMember.firstName} 
         {" "}
         {myMember.lastName} 
         {" ."}
            <Button variant="outlined" onClick={() => handleOpenDialog(index)}>
              Open card
            </Button>
          
          {dialogOpen?<MemberDialog
            key={`dialog-${myMember.id}`}
            isOpen={openDialogIndex === index}
            handleClose={handleCloseDialog}
            myMember={myMember}
            handleUpdateClick={handleUpdateClick}
            handleInputChange={handleInputChange}
            handleInputCorChange={handleInputCorChange}
            handleSaveMember={handleSaveMember}
            updatedMember={updatedMember}
            updateCorona={updateCorona}
            isUpdating={isUpdating}
            handleDelete={handleDelete}
            handleImageChange ={handleImageChange}
            //img={`data:image/jpg;base64,${myMember.image}`}
          />:" "}
        </div>
      ))}
    </>
  );
      }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function MemberDialog({ isOpen, handleClose, myMember, handleUpdateClick, handleInputChange,handleInputCorChange, handleSaveMember, updatedMember, updateCorona, isUpdating, handleDelete,handleImageChange}){
 
    const [showCorona,setShowCorona]=useState(false)
     
    const handleShowCorona=()=>{
        setShowCorona(!showCorona);
    }
    const handleSaveClick = () => {
        handleSaveMember(myMember.id, updatedMember,myMember.coronaDetails.id, updateCorona); // Call the callback function passed from Members
      };
      
  
    return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" 
      style={{alignItems: 'center',display:'flex'}}>
       {myMember.firstName} {" "} {myMember.lastName} details {" :"}  
       {myMember.image?<Avatar src={`data:image/jpg;base64,${myMember.image}`}></Avatar>
       :<Avatar src={defaultimg}></Avatar>}
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
        {isUpdating ? (
          // Render input fields for updating member details
          <div>
             <TextField
              name="id"
              label="id"
              value={updatedMember.id}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <TextField
              name="firstName"
              label="First Name"
              value={updatedMember.firstName}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <TextField
              name="lastName"
              label="Last Name"
              value={updatedMember.lastName}
              onChange={handleInputChange}
            />
               <br></br>
               <br></br>
             <TextField
              name="dateOfBirth"
              label="date of birth"
              value={updatedMember.dateOfBirth}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <TextField
              name="street"
              label="street"
              value={updatedMember.street}
              onChange={handleInputChange}
            />
            <br></br>
               <br></br>
               <TextField
              name="buildingNumber"
              label="building number"
              value={updatedMember.buildingNumber}
              onChange={handleInputChange}
            />
             <br></br>
               <br></br>
               <TextField
              name="city"
              label="city"
              value={updatedMember.city}
              onChange={handleInputChange}
            />
            <br></br>
               <br></br>
               <TextField
              name="mobilePhone"
              label="mobile phone"
              value={updatedMember.mobilePhone}
              onChange={handleInputChange}
            />
             <br></br>
               <br></br>
               <TextField
            name="image"
            label="image"
            type="file"
            //value={img}
            onChange={handleImageChange}
              />
               <br></br>
            <br></br>
          <TextField  
            name="getPositive"
            label="getPositive"
            type="date"
            value={updateCorona.getPositive}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          />
           <br></br>
            <br></br>
          <TextField  
            name="recoveryDate"
            label="recoveryDate"
            type="date"
            value={updateCorona.recoveryDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          /><br></br>
          <TextField 
            name="vac1.vaccinationDate"
            label="vac1.vaccinationDate"
            type="date"
            value={updateCorona.vac1.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          /> 
          <TextField  
            name="vac1.manufacturer"
            label="vac1.manufacturer"
            type="text"
            value={updateCorona.vac1.manufacturer}
            onChange={handleInputCorChange}
            margin="normal"
          />
           <br></br>
           
             <TextField  
            name="vac2.vaccinationDate"
            label="vac2.vaccinationDate"
            type="date"
            value={updateCorona.vac2.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          /> 
          <TextField 
            name="vac2.manufacturer"
            label="vac2.manufacturer"
            type="text"
            value={updateCorona.vac2.manufacturer}
            onChange={handleInputCorChange}
            margin="normal"
          />
           <br></br>
            
          <TextField  
            name="vac3.vaccinationDate"
            label="vac3.vaccinationDate"
            type="date"
            value={updateCorona.vac3.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          /> 
          <TextField 
            name="vac3.manufacturer"
            label="vac3.manufacturer"
            type="text"
            value={updateCorona.vac3.manufacturer}
            onChange={handleInputCorChange}
            margin="normal"
          />
           
            <br></br>
          <TextField  
            name="vac4.vaccinationDate"
            label="vac4.vaccinationDate"
            type="date"
            value={updateCorona.vac4.vaccinationDate}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            onChange={handleInputCorChange}
            margin="normal"
          /> 
          <TextField  
            name="vac4.manufacturer"
            label="vac4.manufacturer"
            type="text"
            value={updateCorona.vac4.manufacturer}
            onChange={handleInputCorChange}
            margin="normal"
          />
           <br></br>
            
          {/* <TextField  
            name="hmoMember.id"
            label="hmoMember.id"
            type="text"
            value={updateCorona.hmoMember.id}
            onChange={handleInputCorChange}
            margin="normal"
          /> */}
          </div>
        ) : ( 
             <div>
            <Typography gutterBottom>
              <p><span style={{ color: 'blue' }}>Id:</span>{myMember.id}</p>
              <p><span style={{ color: 'blue' }}>Name:</span>{myMember.firstName} {myMember.lastName}</p>
              <p><span style={{ color: 'blue' }}>Date of birth:</span>{ myMember.dateOfBirth}</p> 
              <p><span style={{ color: 'blue' }}>Address:</span>{myMember.street} {myMember.buildingNumber} {myMember.city}</p>
              <p><span style={{ color: 'blue' }}>Mobile phone:</span>{myMember.mobilePhone}</p>
              <p><span style={{ color: 'blue' }}>Phone:</span>{myMember.phone}</p>
              {myMember.coronaDetails&&<Button onClick={handleShowCorona} variant="outlined">corona details <KeyboardArrowDownIcon/></Button>}
              {showCorona&& <p><span style={{ color: 'blue' }}>getPositive:</span>{myMember.coronaDetails.getPositive}</p>}
              {showCorona&& <p><span style={{ color: 'blue' }}>recoveryDate:</span>{myMember.coronaDetails.recoveryDate}</p>}
              {showCorona&& <p><span style={{ color: 'blue' }}>vaccination:</span></p>}
              {showCorona&&myMember.coronaDetails.vac1&& <p><span style={{ color: 'blue' ,textDecoration: 'underline'}}>#1 vaccination:</span></p>}
              {showCorona&&myMember.coronaDetails.vac1&& <p><span style={{ color: 'blue' }}>date of #1 vaccination:</span>{myMember.coronaDetails.vac1.vaccinationDate}</p>}
              {showCorona&&myMember.coronaDetails.vac1&& <p><span style={{ color: 'blue' }}>manufacturer:</span>{myMember.coronaDetails.vac1.manufacturer}</p>}
              {showCorona&&myMember.coronaDetails.vac2&& <p><span style={{ color: 'blue' ,textDecoration: 'underline' }}>#2 vaccination:</span></p>}
              {showCorona&&myMember.coronaDetails.vac2&& <p><span style={{ color: 'blue' }}>date of #2 vaccination:</span>{myMember.coronaDetails.vac2.vaccinationDate}</p>}
              {showCorona&&myMember.coronaDetails.vac2&& <p><span style={{ color: 'blue' }}>manufacturer:</span>{myMember.coronaDetails.vac2.manufacturer}</p>}
              {showCorona&&myMember.coronaDetails.vac3&& <p><span style={{ color: 'blue' ,textDecoration: 'underline'}}>#3 vaccination:</span></p>}
              {showCorona&&myMember.coronaDetails.vac3&& <p><span style={{ color: 'blue' }}>date of #3 vaccination:</span>{myMember.coronaDetails.vac3.vaccinationDate}</p>}
              {showCorona&&myMember.coronaDetails.vac3&& <p><span style={{ color: 'blue' }}>manufacturer:</span>{myMember.coronaDetails.vac3.manufacturer}</p>}
              {showCorona&&myMember.coronaDetails.vac4&& <p><span style={{ color: 'blue',textDecoration: 'underline' }}>#4 vaccination:</span></p>}
              {showCorona&&myMember.coronaDetails.vac4&& <p><span style={{ color: 'blue' }}>date of #4 vaccination:</span>{myMember.coronaDetails.vac4.vaccinationDate}</p>}
              {showCorona&&myMember.coronaDetails.vac4&& <p><span style={{ color: 'blue' }}>manufacturer:</span>{myMember.coronaDetails.vac4.manufacturer}</p>}

              {/* {showCorona&&<CoronaDet myMember={myMember}></CoronaDet>} */}
            </Typography>
            {/* Display other member details */}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() =>handleDelete(myMember.id, myMember.coronaDetails ? myMember.coronaDetails.id : null)}><Icon path={mdiDeleteForever} size={1} />
        delete member</Button>
        {isUpdating && (
          // Render "Save" button only in update mode
          <Button autoFocus onClick={() =>handleSaveClick(myMember.id)}>
          Save
          </Button>
          )}
          {!isUpdating?<Button autoFocus onClick={handleUpdateClick}>
          Update Details
          </Button>:""}
          </DialogActions>
          </BootstrapDialog>
          );

          
          
          }
          
          

  
