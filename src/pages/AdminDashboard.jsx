import React, { useCallback, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const fetchUsers = useCallback(async () => {
        try {
            const res = await axiosInstance.get("/admin/users");
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
            const res = await axiosInstance.post("/admin/toggleBan", {
                id: id,
            });
            setUsers((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, ban: !row.ban } : row
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
                field: "ban",
                headerName: "Ban",
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
                            color={params?.row?.ban ? "success" : "error"}
                        >
                            {params?.row?.ban ? "UNBAN" : "BAN"}
                        </Button>
                    );
                },
            },
        ],
        [toggleBan]
    );
    return (
        <Container sx={{ my: 5 }}>
            {users?.length > 0 && (
                <DataGrid
                    //style={{ width: "fit-content", margin: "auto" }}
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

export default AdminDashboard;
