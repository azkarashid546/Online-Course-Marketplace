import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Box } from '@mui/material';
import { useGetAllContactUsQuery } from '../../../redux/features/conatctus/conatctusApi';
import Loader from '../../../components/Loader/Loader';

const AllContacts = () => {
  const { data, isLoading } = useGetAllContactUsQuery();
  console.log(data)
  const columns = [
    { field: 'id', headerName: 'ID', flex : 0.3},
    { field: 'firstName', headerName: 'First Name', flex : 0.5 },
    { field: 'lastName', headerName: 'Last Name', flex : 0.5 },
    { field: 'email', headerName: 'Email', flex : 0.5 },
    { field: 'phone', headerName: 'Phone', flex : 0.5 },
    { field: 'country', headerName: 'Country', flex : 0.5 },
    { field: 'message', headerName: 'Message', flex : 0.5 },
    {
        field: " ",
        headerName: "Email",
        flex: 0.2,
        renderCell: (params) => {
           
          return (
            <>
              <a href={`mailto:${params.row.email}`}>
                <i className="fa-solid fa-envelope text-white" size={20}></i>
              </a>
            </>
          );
        },
      },
  ];

  const rows = data?.contacts?.map((contact, index) => ({
    id: contact._id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    country: contact.country,
    message: contact.message,
  }));

  return (
    <div style={{ marginTop: "40px" }}>
     
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
  );
};

export default AllContacts;

