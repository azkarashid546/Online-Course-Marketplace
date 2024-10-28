import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { analyticsApi, useGetCoursesAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import Loader from "../../../components/Loader/Loader";

const CoursesAnalytics = () => {
  const { data, isLoading, isSuccess, error } = useGetCoursesAnalyticsQuery();

  const analyticsData = []
  data && data.courses.last12Months.forEach((item) => {
    analyticsData.push({name : item.month, uv : item.count})
  })
  const minVlue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
         <div style={{marginTop : "20px"}}>
         <h1 className="text-white px-4">Courses Analytics</h1>
          <p className="px-5 text-white">
            Last 12 Months Analytics Data
          </p>
         </div>
        <div style={{ width: "100%", height: "70%" }} className="d-flex align-items-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minVlue, "auto"]} />
                <Bar dataKey="uv" fill="#89D5F6">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
       
        
        </>
      )}
    </>
  );
};

export default CoursesAnalytics;
