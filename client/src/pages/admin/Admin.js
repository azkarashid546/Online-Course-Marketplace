import React, {useState} from 'react'
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import DashboardHero from './DashboardHero';
import DashboardHeader from './DashboardHeader';
const Admin = () => {
 
  return (
    <>
     <div className="wrapper">
      <DashboardSidebar/>
      <div className="main px-3 py-2" style={{backgroundImage: "linear-gradient(to right, #434d56, #242424)"}}>
        <DashboardHeader/>
            <Outlet/>
        </div>
     </div>
    </>
  )
}

export default Admin
