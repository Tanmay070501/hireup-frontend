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
    styled,
    tableCellClasses,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import BackdropLoader from "../components/BackdropLoader";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const columns = [
    { id: "sr.no.", label: "Sr. No.", minWidth: 170, align: "center" },
    { id: "job-title", label: "Job Title", minWidth: 100, align: "center" },
    {
        id: "Job Type",
        label: "Job Type",
        minWidth: 170,
        align: "center",
    },
    {
        id: "Job Location",
        label: "Job Location",
        minWidth: 170,
        align: "center",
    },
    {
        id: "Salary",
        label: "Salary/CTC",
        minWidth: 170,
        align: "center",
    },
    {
        id: "No. of Applicants",
        label: "No. of Applicants",
        minWidth: 170,
        align: "center",
        type: "number",
    },
];

function RecruiterDashboard() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const prepareRowData = (data) => {
        return data.map((el, idx) => {
            return {
                "job-title": el.title,
                "No. of Applicants": el?.applied?.length,
                "sr.no.": idx + 1,
                "Job Type": el.jobType,
                "Job Location": el?.jobLocation || "Not Specified",
                Salary: el?.salary || "Not Specified",
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
            const res = await axiosInstance.get("/recruiter/jobs");
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
                    No such jobs found!
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
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </StyledTableCell>
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
                                            component={Link}
                                            to={`/job/${row.id}`}
                                            style={{ textDecoration: "none" }}
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

export default RecruiterDashboard;
