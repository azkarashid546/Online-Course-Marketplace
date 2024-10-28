import React, {useState} from 'react'
import { Outlet } from "react-router-dom";
import InstructorSidebar from './InstructorSidebar';
import InstructorHeader from './InstructorHeader';
const Instructor = () => {
 
  return (
    <>
     <div className="wrapper">
      <InstructorSidebar/>
      <div className="main px-3 py-2" style={{backgroundImage: "linear-gradient(to right, #434d56, #242424)"}}>
        <InstructorHeader/>
            <Outlet/>
        </div>
     </div>
    </>
  )
}

export default Instructor