import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDeleteCourseMutation, useGetAllCoursesInstructorQuery, useGetAllCoursesQuery } from '../../../redux/features/courses/coursesApi';
import Loader from '../../../components/Loader/Loader';
import { format } from 'timeago.js';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminAllCourses = () => {
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.auth.user);

  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  console.log(data)
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Course Title', flex: 1 },
    { field: 'ratings', headerName: 'Ratings', flex: 0.5 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
    { field: 'createdAt', headerName: 'Created At', flex: 0.5 },
    { field: 'viewCourse', headerName: 'View Course', flex: 0.5 ,
    renderCell : (params) => {
     return (
       <Link to={`/admin-course/${params.row.id}`}>View Course</Link>
     )
    }
   },
    
  ];

  const rows = [];
  if (data && data.courses) {
    data.courses.forEach((item, index) => {
      
      // Check if the course instructor ID matches the logged-in user's ID
    
        rows.push({
          id: item._id,
          name: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          createdAt: format(item.createdAt),
        });
      
    });
  }



  return (
    <>
      <div style={{ marginTop: '40px' }}>
        <Toaster />
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <Box
              m="10px 0 0 0"
              height="88vh"
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
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
            
          </Box>
        )}
      </div>
    </>
  );
};

export default AdminAllCourses;
