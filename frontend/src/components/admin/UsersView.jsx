import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { useEffect } from "react";
import { blockUser, getAllusers } from "../../features/admin/adminService";
import { useState } from "react"; 
import { CleaningServices, Hail, ReportGmailerrorred } from "@mui/icons-material";
import { HiChevronDoubleLeft, HiLockClosed, HiOutlineLockClosed } from "react-icons/hi";

const UsersView = () => {
  
  const theme = useTheme();

  const [users, setUsers] = useState()
  const [isBlock, setIsBlock] = useState(false)

  async function fetchData(){

    const data = await getAllusers()
    setUsers(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  //Block the user
  async function handleBlock(userId, manage) {
    const result = await blockUser(userId, manage)
    fetchData()
  }

  if(!users){
    return <div>No users available</div>
  }

  const data = users.map(user => {
    return {
      ...user,
      id: user._id.replace(/_/g, "")
    }
  })


  const colors = tokens(theme.palette.mode);
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
        cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Role",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
    },
    {
      field: "verified",
      headerName: "Verified",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Manage",
      flex: 1,
      renderCell: ({ row: { _id, isActive } }) => {
        return (
          <Box
            width="40%"
            // m="0 auto" 
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={ colors.greenAccent[600] }
            borderRadius="4px"
          >
            { isActive && <Button onClick={((e) => handleBlock(_id, 'Block'))}><LockOpenOutlinedIcon /></Button>}
            { !isActive && <Button onClick={((e) => handleBlock(_id, 'UnBlock'))}><HiOutlineLockClosed /></Button>}

            {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />} */}
            
            {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {_id}
            </Typography> */}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="List of all the user" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default UsersView