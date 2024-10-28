import React, { useEffect } from 'react';
import { useGetOrdersAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';
import Loader from '../../../components/Loader/Loader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const OrdersAnalytics = ({ isDashboard }) => {
  const { data, isLoading, error } = useGetOrdersAnalyticsQuery();
  console.log(data)
  useEffect(() => {}, []);

  const analyticsData = [];
  data &&
    data.orders.last12Months.forEach((item) => {
      analyticsData.push({ name: item.name, count: item.count });
    });

  return (
    <>
      {isLoading ? (
       isDashboard ? (<></>) : (<Loader />)
      ) : (
        <>
          <div className={`${!isDashboard ? 'ms-3 mb-0' : ''}`} style={{backgroundColor : isDashboard ? "#0E2238" : "", borderRadius : isDashboard ? "5px 5px 0 0 " : "", marginTop : isDashboard ? "40px" : "0"}}>
            <h1 className={`px-4 ${isDashboard ? 'custom-text-20 mb-0 py-4' : ''} text-start text-white`}>
              Orders Analytics
            </h1>
            {!isDashboard && <p className="px-5 text-white">Last 12 Months Analytics Data</p>}
          </div>
          <div style={{ width: isDashboard ? '100%' : "100%", height: isDashboard ? '70%' : "50%", backgroundColor : isDashboard ? "#0E2238" : "", borderRadius : isDashboard ? "0 0 5px 5px" : "" }} className="d-flex align-items-center">
            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '100%' : '90%'}>
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#89D6F7" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
};

export default OrdersAnalytics;

