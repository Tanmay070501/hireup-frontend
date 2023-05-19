import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import BackdropLoader from "../components/BackdropLoader";
import { toast } from "react-toastify";

function JobPost() {
    const { jobId } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchJobPost = useCallback(async (id) => {
        setLoading(() => true);
        try {
            const res = await axiosInstance.get(`/job/${id}`);
            console.log(res);
            setLoading(() => false);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong!"
            );
            setLoading(() => false);
            navigate("/");
        }
    }, []);
    useEffect(() => {
        fetchJobPost(jobId);
    }, [jobId, fetchJobPost]);
    if (loading) return <BackdropLoader open={true} />;
    return <div>{jobId}</div>;
}

export default JobPost;
