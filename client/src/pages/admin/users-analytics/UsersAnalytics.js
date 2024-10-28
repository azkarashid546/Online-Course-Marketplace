import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import { useGetUsersAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import Loader from "../../../components/Loader/Loader";

const UsersAnalytics = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery();

  // Check if data is available and transform it to the expected format
  const analyticsData = data
    ? data.users.last12Months.map((item) => ({
        name: item.month,
        count: item.count,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        isDashboard ? (<></>) : (<Loader />)
      ) : (
        // <div className={`${!isDashboard ? "mt-4" : "mt-4 pb-5 rounded-sm shadow-sm"}`}>
        //   <div className={`${!isDashboard ? "ms-3 mb-5" : ""}`}>
        //     <h1 className={`px-4 ${isDashboard ? "custom-text-20" : ""} text-start text-white`}>
        //       Users Analytics
        //     </h1>
        //     {!isDashboard && (
        //       <p className="px-5 text-white">Last 12 Months Analytics Data</p>
        //     )}
        //   </div>
        //   <div >
        //     <ResponsiveContainer width={isDashboard ? "100%" : "90%"} height={isDashboard ? "50%" : "100%"}>
        //       <AreaChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        //         <XAxis dataKey="name" />
        //         <YAxis />
        //         <Tooltip />
        //         <Area type="monotone" dataKey="count" stroke="#4d62de" fill="#4d62de" />
        //       </AreaChart>
        //     </ResponsiveContainer>
        //   </div>
        // </div>
        <>
        

       
        
       <div className={`${!isDashboard ? "ms-3 mb-0" : ""}`}style={{backgroundColor : isDashboard ? "#0E2238" : "", borderRadius : isDashboard ? "5px 5px 0 0 " : "",  marginTop : isDashboard ? "20px" : "0"}}>
            <h1 className={`px-4 ${isDashboard ? "custom-text-20 mb-0 py-4" : ""} text-start text-white`}>
               Users Analytics
            </h1>
             {!isDashboard && (
             <p className="px-5 text-white">Last 12 Months Analytics Data</p>
         )}
        </div>
      
        <div style={{width : isDashboard ? "100%" : "100%", height : isDashboard ? "70%" : "50%", backgroundColor : isDashboard ? "#0E2238" : "", borderRadius : isDashboard ? "0 0 5px 5px " : ""}} className="d-flex align-items-center">
        <ResponsiveContainer width={isDashboard ? "100%" : "100%"} height={isDashboard ? "100%" : "90%"}>
          <AreaChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#4d62de" fill="#4d62de" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      </>
      )}
    </>
  );
};

export default UsersAnalytics;

