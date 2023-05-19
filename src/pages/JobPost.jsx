import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import BackdropLoader from "../components/BackdropLoader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { jobActions } from "../store/job";

function JobPost() {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
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
    if (loading) return <BackdropLoader open={true} />;
    return <div>{jobId}</div>;
}

export default JobPost;
