import React from "react";
import Header from "./Header";
import Footer from "./Footer"
import { Outlet } from "react-router-dom";
const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </>
  );
};

export default BasicLayout;