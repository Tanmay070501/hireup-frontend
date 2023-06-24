import { Button, Container } from "@mui/material";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

function PCellDashboard() {
    const [users, setUsers] = React.useState([]);
    const fetchUsers = React.useCallback(async () => {
        try {
            const res = await axiosInstance.get("/pcell/students");
            console.log(res);
            setUsers(res?.data?.result || []);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong!"
            );
        }
    }, []);
    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    console.log(users);
    const toggleBan = React.useCallback(async (id) => {
        try {
            const res = await axiosInstance.post("/pcell/toggleBan", {
                id: id,
            });
            setUsers((prevRows) =>
                prevRows.map((row) =>
                    row._id === id
                        ? { ...row, banByPCell: !row.banByPCell }
                        : row
                )
            );
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    }, []);
    const columns = React.useMemo(
        () => [
            {
                field: "_id",
                headerName: "User Id",
                //minWidth: 90,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "name",
                headerName: "Name",
                //minWidth: 150,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "email",
                headerName: "Email",
                //minWidth: 150,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "role",
                headerName: "Role",
                //type: "number",
                //minWidth: 110,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "course",
                headerName: "course",
                //type: "number",
                //minWidth: 110,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "coursePercentage",
                headerName: "Course Percentage",
                //type: "number",
                //minWidth: 110,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "tenthPercentage",
                headerName: "10th Percentage",
                //type: "number",
                //minWidth: 110,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "twelvethPercentage",
                headerName: "12th Percentage",
                //type: "number",
                //minWidth: 110,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "banByPCell",
                headerName: "Ban Status",
                flex: 1,
                headerAlign: "center",
                align: "center",
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return (
                        <Button
                            onClick={() => {
                                toggleBan(params.row._id);
                            }}
                            variant="contained"
                            color={
                                params?.row?.banByPCell ? "success" : "error"
                            }
                        >
                            {params?.row?.banByPCell ? "UNBAN" : "BAN"}
                        </Button>
                    );
                },
            },
        ],
        [toggleBan]
    );
    return (
        <Container maxWidth="100%" sx={{ my: 5, overflow: "auto" }}>
            {users?.length > 0 && (
                <DataGrid
                    //style={{ width: "fit-content", margin: "auto" }}
                    style={{ overflow: "auto" }}
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    //checkboxSelection
                    disableRowSelectionOnClick
                    getRowId={(row) => row?._id}
                />
            )}
        </Container>
    );
}

export default PCellDashboard;
