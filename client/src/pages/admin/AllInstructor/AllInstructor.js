import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/features/user/userApi";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const AllInstructor = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("instructor");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();
  const { isLoading, error, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <i
                className="fa-solid fa-trash text-white"
                onClick={() => {
                  setOpen(!open);
                  setUserId(params.row.id);
                }}
                size={20}
              ></i>
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
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

  const rows = [];

    const newData = data && data.users.filter((item) => item.role === "instructor");
    newData &&
      newData.forEach((item, index) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
 

  useEffect(() => {
   
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
  }, [isSuccess, updateError, deleteSuccess]);
 
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = userId;
    await deleteUser(id);
  };
  return (
    <>
      <div style={{ marginTop: "40px" }}>
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
            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="position-absolute top-50 start-50 translate-middle rounded-2 shadow p-4"
                  style={{
                    width: "450px",
                    outline: "none",
                    backgroundColor: "#7f8284",
                  }}
                >
                  <h1
                    className="text-white text-center"
                    style={{ fontSize: "33px" }}
                  >
                    Are you sure to delete this user?
                  </h1>
                  <div className="d-flex w-100 align-items-center justify-content-between gap-2 mb-6 mt-4">
                    <div
                      className="btn btn-primary"
                      style={{ borderRadius: "50px", width: "120px" }}
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </div>
                    <div
                      className="btn btn-danger"
                      style={{ borderRadius: "50px", width: "120px" }}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default AllInstructor;

