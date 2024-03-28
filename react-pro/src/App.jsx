import { useState } from 'react'
import './App.css'
import HomePage from './homePage/HomePage'
import Members from './members/Members'
import Header from './layOut/Header'
import { Router, Routes, Route } from 'react-router-dom';
import MemberDet from './members/MemberDet'
import AddMember from './members/AddMember'
import CoronaDet from './corona/CoronaDet'
import Footer from './layOut/Footer'
function App() {
   
  return (
    <>
        <Header></Header>
        {/* <Members></Members> */}
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="homePage" element={<HomePage/>} />
        <Route path="members" element={<Members/>} />
        <Route path="corona" element={<CoronaDet/>} />
        <Route path="memberDet" element={<MemberDet />} />
        <Route path="addMember" element={<AddMember />} />
        <Route path="coronaDet" element={<CoronaDet/>}/>
    </Routes>
    {/* <Footer></Footer> */}
    

      
    </>
  )
}

export default App
