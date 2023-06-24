import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import BackdropLoader from "../components/BackdropLoader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "../store/job";
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Modal,
    Typography,
} from "@mui/material";
import no_img from "../images/no-image.png";
import "jodit/build/jodit.min.css";
import parse from "html-react-parser";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
  

function JobPost() {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const job = useSelector((state) => state.jobPost?.job);
    const user = useSelector((state) => state.auth?.user);
    const [applicants, setApplicants] = React.useState([]);
    console.log(applicants)
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const fetchJobPost = useCallback(
        async (id) => {
            setLoading(() => true);
            try {
                const res = await axiosInstance.get(`/job/${id}`);
                console.log(res);
                dispatch(jobActions.setJob({ job: res?.data?.result }));
                setLoading(() => false);
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "Something went wrong!"
                );
                setLoading(() => false);
                navigate("/");
            }
        },
        [navigate, dispatch]
    );
    useEffect(() => {
        fetchJobPost(jobId);
        return () => {
            dispatch(jobActions.clearJob());
        };
    }, [jobId, fetchJobPost, dispatch]);
    const columns = React.useMemo(
        () => [
            {
                field: "name",
                headerName: "Student",
                //minWidth: 90,
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "course",
                headerName: "Course",
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
                field: "resume",
                headerName: "Resume Link",
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                    return (
                        <a href={params?.row?.resume} target="_blank" rel="noreferrer">Click here</a>
                    );
                },
            },
        ],
        []
    );
    const applyJobHandler = async () => {
        try {
            const res = await axiosInstance.put("/student/apply", {
                jobId: jobId,
            });
            toast.success(res.data.message);
            fetchJobPost(jobId);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    };
    const applicantsListHandler = async() => {
        try{
            const res = await axiosInstance.get(`/recruiter/job/applicants/${jobId}`)
            console.log(res)
            setApplicants(res?.data?.result);
            setOpen(true);
        }catch(error){
            setOpen(false)
            toast.error(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    }
    const deleteHandler = async () => {
        try{
            const res = await axiosInstance.delete(`recruiter/job/${jobId}`);
            toast.success(res?.data?.message);
            navigate("/");
        }catch(error){
            toast.error(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    }
    const renderButtons = () => {
        if (user?._id === job?.createdBy?.user?._id) {
            return (
                <>
                    <Button onClick={deleteHandler} variant="outlined" color="error">
                        Delete
                    </Button>
                    <Button onClick={applicantsListHandler} variant="outlined" color="secondary">
                        View Applicants
                    </Button>
                </>
            );
        }
        if (job?.applied.includes(user?._id)) {
            return (
                <>
                    <Button
                        variant="outlined"
                        color="success"
                        endIcon={<CheckCircleOutlinedIcon />}
                    >
                        Applied
                    </Button>
                </>
            );
        }
        return (
            <>
                <Button
                    onClick={applyJobHandler}
                    variant="outlined"
                    color="secondary"
                >
                    Apply
                </Button>
            </>
        );
    };
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarExport printOptions={{
    hideFooter: true,
    hideToolbar: true,
  }} csvOptions={{fileName:job?.title || "File"}}/>
          </GridToolbarContainer>
        );
      }
    if (loading) return <BackdropLoader open={true} />;
    return (
        <Container maxWidth={"md"}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    my: 3,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        borderRadius: "100%",
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        pointerEvents: "none",
                        border: "1px solid rgba(0,0,0,0.3)",
                    }}
                >
                    <img
                        style={{
                            objectFit: "fill",
                            width: "100%",
                            height: "100%",
                        }}
                        src={job?.company?.logo || no_img}
                        alt="no_image"
                    />
                </Box>
                <Typography variant="h3">
                    {job?.title} at {job?.company?.name}
                </Typography>
                <Divider sx={{ width: "100%" }} />
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        <Card
                            sx={{
                                // width: "100%",
                                //flex: 1,
                                flexBasis: "33.33%",
                                display: "flex",
                                //justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                            }}
                            raised={false}
                        >
                            <Typography variant="body" component="div">
                                Location: {job?.jobLocation || "Not specified"}
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                // width: "100%",
                                //flex: 1,
                                flexBasis: "33.33%",
                                display: "flex",
                                //justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                            }}
                            raised={false}
                        >
                            <Typography variant="body" component="div">
                                Salary/CTC: {job?.salary || "Not specified"}
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                //width: "100%",
                                // flex: 1,
                                flexBasis: "33.33%",
                                display: "flex",
                                //justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                            }}
                            raised={false}
                        >
                            <Typography variant="body" component="div">
                                Created by: {job?.createdBy?.name || "N/A"}
                            </Typography>
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            gap: 2,
                        }}
                    >
                        <Card
                            sx={{
                                //width: "100%",
                                flexBasis: "33.33%",
                                display: "flex",
                                //justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                            }}
                            raised={false}
                        >
                            <Typography variant="body" component="div">
                                Website:{" "}
                                {job?.company?.website ? (
                                    <a
                                        href={job?.company?.website}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {job?.company?.website}
                                    </a>
                                ) : (
                                    <span>Not specified</span>
                                )}
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                //width: "100%",
                                flexBasis: "33.33%",
                                display: "flex",
                                //justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                            }}
                            raised={false}
                        >
                            <Typography variant="body" component="div">
                                Job Type:{" "}
                                {job?.jobType === "oncampus"
                                    ? "On Campus"
                                    : "Off Campus"}
                            </Typography>
                        </Card>
                        {job?.jobType === "oncampus" && (
                            <Card
                                sx={{
                                    //width: "100%",
                                    flexBasis: "33.33%",
                                    display: "flex",
                                    //justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                                raised={false}
                            >
                                <Typography variant="body" component="div">
                                    Colleges:{" "}
                                    {job?.colleges?.join(", ") ||
                                        "Not Specified"}
                                </Typography>
                            </Card>
                        )}
                    </Box>
                </Box>
                <Divider sx={{ width: "100%" }} />

                <div style={{ width: "100%" }} className="jodit-wysiwyg">
                    {parse(job?.description || "Something is wrong!")}
                </div>
                <Divider sx={{ width: "100%" }} />
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    {renderButtons()}
                </Box>
            </Box>
            {open && <Modal open={open} onClose={() => {setOpen(false)}} keepMounted>
                <Box sx={{position: "absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
                    <Box sx={{height:"50vh", width:"80vw"}}>
                    <DataGrid
                    style={{backgroundColor:"white"}}
                        rows={applicants}
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
                        slots={{
                            toolbar: CustomToolbar,
                          }}
                        slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
                    />
                </Box>
                </Box>
            </Modal>}
        </Container>
    );
}

export default JobPost;
