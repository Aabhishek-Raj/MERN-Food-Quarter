
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { tokens } from "./theme";
import Header from "./Header";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { blockSupplier, getSalesReport, getVerifiedSuppliers } from "../../features/admin/adminService";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";


const SalesReport = () => {

    const [salesReport, setSalesReport] = useState()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    async function fetchData() {

        const data = await getSalesReport()
        // console.log(data)
        setSalesReport(data)
    }

    useEffect(() => {

        fetchData()
    }, [])

    const handleBlock = async (supplierId, manage) => {
        const result = await blockSupplier(supplierId, manage)
        console.log(result)
        fetchData()
    }

    console.log(salesReport)

    if (!salesReport) {
        return <div>No Suppliers present</div>
    }

    const data = salesReport.map(supplier => {
        return {
            ...supplier,
            id: supplier._id.replace(/_/g, "")
        }
    })

    console.log(salesReport)

    const columns = [
        // { field: "id", headerName: "Registrar ID" },
        {
            field: "supplierId Name",
            headerName: "supplierId.name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "supplierId.email",
            headerName: "Email",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "user.username",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "user.email",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "total",
            headerName: "Total",
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "No of Items",
            flex: 1,
            cellRenderer: ({ row: { license } }) => <a href={`http://localhost:4000/images/${license}`} target="_blank" rel="noopener noreferrer"><img src={`http://localhost:4000/images/${license}`} alt="" />Click here</a>
        },
        // {
        //   field: "image",
        //   headerName: "Image",
        //   flex: 1,
        // },
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
        {
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
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        {isActive && <Button onClick={((e) => handleBlock(_id, 'Block'))}><LockOpenOutlinedIcon /></Button>}
                        {!isActive && <Button onClick={((e) => handleBlock(_id, 'UnBlock'))}><HiOutlineLockClosed /></Button>}

                        {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />} */}

                        {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {_id}
            </Typography> */}
                    </Box>
                );
            },
        }
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

export default SalesReport