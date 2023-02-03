import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "./theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "./Header";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { getVerifiedSuppliers } from "../../features/admin/adminService";
import { useState } from "react";

const SuppliersView = () => {
  const theme = useTheme();

  const [suppliers, setSuppliers] = useState()
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    async function fetchData(){

      const data = await getVerifiedSuppliers()
      setSuppliers(data)
    }
    fetchData()
  },[])

  if(!suppliers){
    return <div>No Suppliers present</div>
  }

  const data = suppliers.map(supplier => {
    return {
      ...supplier, 
      id: supplier._id.replace(/_/g, "")
  }
  })

  const columns = [
    // { field: "id", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Terms",
      flex: 1,
    },
    {
      field: "foodLicense",
      headerName: "License",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="SUPPLIERS"
        subtitle="List of all the Suppliers "
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default SuppliersView