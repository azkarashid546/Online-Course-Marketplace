import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../../../components/Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/ordersApi";
import { Link } from "react-router-dom";

const AllInvoices = ({ isDashboard }) => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: coursesData } = useGetAllCoursesQuery();
  console.log(usersData)
  const [orderData, setOrderData] = useState([]);
  console.log("orderData",data)
  useEffect(() => {
    if (data && usersData && coursesData) {
      const temp = data.orders.map((item) => {
        const user = usersData.users.find((user) => user._id === item.userId);
        const course = coursesData.courses.find((course) => course._id === item.courseId);

        return {
          ...item,
          id: item._id, // Ensure there's a unique id field
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "createdAt", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params) => (
              <Link to={`mailto:${params.row.userEmail}`}>
                <i className="fa-solid fa-envelope fa-lg text-white"></i>
              </Link>
            ),
          },
        ]),
  ];

  const rows = orderData.map((item, index) => ({
    id: item._id, // Make sure each row has a unique id
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    createdAt: format(item.createdAt),
  }));

  return (
    <div style={{ marginTop: !isDashboard ? "40px" : "0px" }}>
      {isLoading ? (
        !isDashboard && <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            height={isDashboard ? "50vh" : "90vh"}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: 'white',
              },
              '& .MuiDataGrid-sortIcon': {
                color: 'white',
              },
              '& .MuiDataGrid-row': {
                color: 'white',
                borderBottom: '1px solid white',
              },
              '& .MuiTablePagination-root': {
                color: 'white',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: 'white',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#0E2238',
                borderBottom: 'none',
                color: 'white',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: '#1F2A40',
              },
              '& .MuiDataGrid-footerContainer': {
                color: 'white',
                borderTop: 'none',
                backgroundColor: '#0E2238',
              },
              '& .MuiCheckbox-root': {
                color: '#b7ebde',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: 'white',
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false :true}
              rows={rows}
              columns={columns}
              components={isDashboard ?  {} :
                {Toolbar: GridToolbar}}
              density="comfortable" // default density, can be adjusted
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;


