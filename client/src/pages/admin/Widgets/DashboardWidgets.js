import React from "react";
import UsersAnalytics from "../users-analytics/UsersAnalytics";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Loader from "../../../components/Loader/Loader";
import OrdersAnalytics from "../orders-analytics/OrdersAnalytics";
import AllInvoices from "../Invoices/AllInvoices"
const CircularProgressWithLabel = ({ open, value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: 50, // Set a fixed width for better alignment
        height: 50, // Set a fixed height for better alignment
      }}
    >
      <CircularProgress
        variant="determinate"
        size={50}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
        value={value}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: "white", // Set text color
          fontSize: "16px", // Set font size
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets = ({ open, value, isDashboard , isLoading}) => {
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-3 min-vh-100">
            <div className="row g-0">
              <div
                className="col-md-8 p-1"
                // style={{ backgroundColor: "#0E2238" }}
              >
                <UsersAnalytics isDashboard={true} />
              </div>
              <div className="col-md-4">
                <div className="p-4">
                  <div
                    className="w-100 rounded shadow-sm"
                    style={{ backgroundColor: "#0E2238" }}
                  >
                    <div className="d-flex align-items-center justify-content-between p-3">
                      <div>
                        <i className="fa fa-border-all text-primary" style={{fontSize : "30px"}}></i>
                        <h5 className="pt-2 text-white">120</h5>
                        <h5
                          className="pt-2 text-primary"
                          style={{ fontSize: "20px" }}
                        >
                          Sales Obtained
                        </h5>
                      </div>
                      <div>
                        <CircularProgressWithLabel value={100} open={open} />
                        <h5 className="text-center text-white pt-4">+120%</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="w-100 rounded shadow-sm"
                    style={{ backgroundColor: "#0E2238" }}
                  >
                    <div className="d-flex align-items-center justify-content-between p-3">
                      <div>
                        <i
                          className="fa fa-users text-primary"
                          style={{ fontSize: "30px" }}
                        ></i>
                        <h5 className="pt-2 text-white">450</h5>
                        <h5
                          className="py-2 text-primary"
                          style={{ fontSize: "20px" }}
                        >
                          New Users
                        </h5>
                      </div>
                      <div>
                        <CircularProgressWithLabel value={100} open={open} />
                        <h5 className="text-center pt-4 text-white">+150%</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0">
              <div
                className="col-md-7 p-1"
                // style={{ backgroundColor: "#0E2238" }}
              >
                <OrdersAnalytics isDashboard={true} />
              </div>
              <div className="col-md-5">
                <div className="p-4">
                  <h5 className="text-white pb-3" style={{fontSize : "20px"}}>
                    Recent Transactions
                  </h5>
                  <AllInvoices isDashboard={true}/>
                  </div>
                </div>
              
              </div>
            </div>
          
        </>
      )}
    </>
  );
};

export default DashboardWidgets;
