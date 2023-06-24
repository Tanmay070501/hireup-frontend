import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import BackdropLoader from "../components/BackdropLoader";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
const columns = [
    { id: "sr.no.", label: "Sr. No.", minWidth: 170, align: "center" },
    {
        id: "Recruiter Name",
        label: "Recruiter Name",
        minWidth: 100,
        align: "center",
    },
    {
        id: "No. of Jobs Created",
        label: "No. of Jobs Created",
        minWidth: 170,
        align: "center",
        type: "number",
    },
];
function CompanyRecruitersList() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const prepareRowData = (data) => {
        return data.map((el, idx) => {
            return {
                "No. of Jobs Created": el.jobCount,
                "Recruiter Name": el?.name,
                "sr.no.": idx + 1,
                code: `${el.title}-${idx}`,
                id: el._id,
            };
        });
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchJobList = useCallback(async () => {
        setLoading(() => true);
        try {
            const res = await axiosInstance.get("/company/recruiters");
            console.log(res);
            setRows(prepareRowData(res?.data?.result));
            setLoading(() => false);
        } catch (err) {
            setLoading(() => false);
            toast.error(
                err?.response?.data?.message || "Something went wrong!"
            );
        }
    }, []);
    useEffect(() => {
        fetchJobList();
    }, [fetchJobList]);
    if (loading) return <BackdropLoader open={true} />;
    if (rows.length === 0)
        return (
            <Container maxWidth={"lg"}>
                <Typography
                    variant="h4"
                    style={{ margin: "20px auto", textAlign: "center" }}
                >
                    No recruiter added yet!
                </Typography>
            </Container>
        );
    return (
        <Container maxWidth={"lg"}>
            <Paper sx={{ width: "100%", overflow: "hidden", my: 6 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column?.type ===
                                                        "number"
                                                            ? value
                                                            : value || "N/A"}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}

export default CompanyRecruitersList;
