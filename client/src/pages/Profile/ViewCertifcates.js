import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useGetAllCoursesByUserQuery } from '../../redux/features/courses/coursesApi';

const ViewCertificates = () => {
    const { data: coursesData } = useGetAllCoursesByUserQuery();
    const user = useSelector((state) => state.auth.user);
    const certificates = user.certificates || [];

    const columns = [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "courseId", headerName: "CourseId", flex: 1 },
      { field: "courseName", headerName: "Course Name", flex: 1 },
      { field: "certificate", headerName: "Certificate", flex: 1, renderCell: (params) => {
          const certificate = params.row.certificate;
          const coursesWithCertificates = coursesData?.courses.filter(course => course.courseData?.length > 0) || [];
          const lastIndex = Math.max(...coursesWithCertificates.map(course => course.courseData.length)) - 1;
          const isLastIndex = params.row.id === lastIndex + 1; // Adjust for 1-based index
          
          if (isLastIndex) {
              return certificate ? <Link to={certificate} target="_blank">View Certificate</Link> : "No Certificate";
          } else {
              return "Certificate Link Disabled";
          }
      }},
      { field: "uploadDate", headerName: "Upload Date", flex: 1 },
    ];
    
    const rows = certificates.map((certificate, index) => {
        const courseDetails = coursesData?.courses.find(course => course._id === certificate.courseId);
        return {
            id: certificate._id,
            courseId: certificate.courseId,
            courseName: courseDetails ? courseDetails.name : "Unknown",
            certificate: certificate.certificate,
            uploadDate: format(certificate.uploadDate),
        }
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
             <Box m="20px">
                  <Box
                    m="10px 0 0 0"
                    height="88vh"
                    sx={{
                      "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none",
                      },
                      "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "white",
                      },
                      "& .MuiDataGrid-sortIcon": {
                        color: "white",
                      },
                      "& .MuiDataGrid-row": {
                        color: "white",
                        borderBottom: "1px solid white",
                      },
                      "& .MuiTablePagination-root": {
                        color: "white",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                      },
                      "& .name-column--cell": {
                        color: "white",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#0E2238",
                        borderBottom: "none",
                        color: "white",
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#1F2A40",
                      },
                      "& .MuiDataGrid-footerContainer": {
                        color: "white",
                        borderTop: "none",
                        backgroundColor: "#0E2238",
                      },
                      "& .MuiCheckbox-root": {
                        color: "#b7ebde",
                      },
                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: "white",
                      },
                    }}
                  >
                    <DataGrid
                      checkboxSelection
                      rows={rows}
                      columns={columns}
                    />
                  </Box>
                </Box>
        </div>
    );
};

export default ViewCertificates;


