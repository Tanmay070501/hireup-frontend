import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import BackdropLoader from "../components/BackdropLoader";
import { Container, Typography } from "@mui/material";
import JobTableRenderer from "../components/JobTableRenderer";
const columns = [
    { id: "sr.no.", label: "Sr. No.", minWidth: 170, align: "center" },
    { id: "job-title", label: "Job Title", minWidth: 100, align: "center" },
    {
        id: "Company Name",
        label: "Company Name",
        minWidth: 100,
        align: "center",
    },

    {
        id: "Job Location",
        label: "Job Location",
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
function AppliedToJobs() {
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
                "Job Location": el?.jobLocation,
                "Company Name": el?.company?.name,
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
            const res = await axiosInstance.get("/student/applied");
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
                    You have not applied to any jobs yet!
                </Typography>
            </Container>
        );
    return (
        <>
            <Container maxWidth={"lg"}>
                <Typography
                    variant="h4"
                    style={{ margin: "20px auto", textAlign: "center" }}
                >
                    Jobs Applied To
                </Typography>
            </Container>
            <JobTableRenderer
                rows={rows}
                columns={columns}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}

export default AppliedToJobs;
