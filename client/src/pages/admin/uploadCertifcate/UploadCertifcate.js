import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesInstructorQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../../../components/Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersInstructorQuery } from "../../../redux/features/user/userApi";
import { useGetAllOrdersInstructorQuery } from "../../../redux/features/orders/ordersApi";
import { Link } from "react-router-dom";
import { useUploadCertificateMutation } from "../../../redux/features/uploadCertifcate/uploadCertifacateApi";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";


const UploadCertificate = ({ isDashboard }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetAllOrdersInstructorQuery();
  const { data: usersData , refetch} = useGetAllUsersInstructorQuery({ refetchOnMountOrArgChange: true,});
  const { data: coursesData } = useGetAllCoursesInstructorQuery();
  const [orderData, setOrderData] = useState([]);
  const [uploadCertificate, { isLoading: isUploading, }] = useUploadCertificateMutation({ refetchOnMountOrArgChange: true,});
  
  console.log("users",usersData)
  console.log("order",data)
  console.log(currentUser)
  useEffect(() => {
    if (data && usersData && coursesData && currentUser) {
      const temp = data.orders
        .filter((item) => item.instructor === currentUser._id) 
        .map((item) => {
          const user = usersData.users.find((user) => user._id === item.userId);
          const course = coursesData.courses.find((course) => course._id === item.courseId);
          const certificate = user?.certificates.find((cert) => cert.courseId === item.courseId);
          console.log(user?.certificates);
          return {
            ...item,
            id: course?._id,
            userName: user?.name,
            userEmail: user?.email,
            userRole: user?.role,
            title: course?.name,
            price: "$" + course?.price,
            certificate: certificate?.certificate || null,
          };
        });

      setOrderData(temp);
      console.log("temp", temp);
    }
  }, [data, usersData, coursesData, currentUser]);

  const handleFileChange = async (event, row) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('userId', row.userId);
      formData.append('courseId', row.courseId);
      formData.append('certificate', file);

      await uploadCertificate(formData);
      toast.success('Certificate uploaded successfully');
      refetch();  // Refetch data after upload
    }
  };

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
    { 
      field: "certificate", 
      headerName: "Certificate", 
      flex: 1,
      renderCell: (params) => (
        params.row.certificate 
          ? <a href={params.row.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a> 
          : <span>No Certificate</span>
      ),
    },
    {
      field: "uploadCertificate",
      headerName: "Upload Certificate",
      flex: 1,
      renderCell: (params) => (
        <div>
          <input type="file" onChange={(event) => handleFileChange(event, params.row)} />
        </div>
      ),
    },
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
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    createdAt: format(item.createdAt),
    certificate: item.certificate,
    userId: item.userId,
    courseId: item.courseId,
  }));

  return (
    <div style={{ marginTop: !isDashboard ? "40px" : "0px" }}>
      <Toaster />
      {isLoading || isUploading ? (
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
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
              density="comfortable"
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default UploadCertificate;

