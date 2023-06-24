import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { DataGrid } from "@mui/x-data-grid";

function CommonApproval(props) {
    const [users, setUsers] = React.useState([]);
    const fetchUsers = React.useCallback(async () => {
        try {
            const res = await axiosInstance.get(
                `/admin/approvalList/${props?.who || "company"}`
            );
            console.log(res);
            setUsers(res?.data?.result || []);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong!"
            );
        }
    }, [props?.who]);
    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    const approveUser = React.useCallback(async (id) => {
        try {
            const res = await axiosInstance.post("/admin/approve", {
                id: id,
            });
            setUsers((prevRows) => prevRows.filter((row) => row._id !== id));
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
                field: "approvedByAdmin",
                headerName: "Need Approvals",
                flex: 1,
                headerAlign: "center",
                align: "center",
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return (
                        <Button
                            onClick={() => {
                                approveUser(params.row._id);
                            }}
                            variant="contained"
                            color={"success"}
                        >
                            APPROVE
                        </Button>
                    );
                },
            },
        ],
        [approveUser]
    );
    return (
        <Container sx={{ my: 5 }}>
            {users.length === 0 && (
                <Typography textAlign={"center"} variant="h4">
                    No User left to appprove!
                </Typography>
            )}
            {users?.length > 0 && (
                <DataGrid
                    //style={{ width: "fit-content", margin: "auto" }}
                    rows={users.filter((el) => !el.approvedByAdmin)}
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

export default CommonApproval;
