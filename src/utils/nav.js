export const nav = {
    company: [
        { id: 1, name: "Invite Recruiter", relativeUrl: "/invite" },
        { id: 2, name: "Recruiters", relativeUrl: "/recruiters" },
    ],
    student: [
        { id: 1, name: "On Campus Jobs", relativeUrl: "/job/oncampus" },
        { id: 2, name: "Off Campus Jobs", relativeUrl: "/job/offcampus" },
        {id:3, name:"Update Details", relativeUrl:"/update-details"},
        {id:4, name:"View Resume", relativeUrl:"/resume"}
    ],
    pcell: [],
    recruiter: [{ id: 1, name: "Create Job Post", relativeUrl: "/job/create" }],
    admin: [
        { id: 1, name: "Home", relativeUrl: "/" },
        { id: 3, name: "Company Approvals", relativeUrl: "/approvals/company" },
        { id: 3, name: "PCell Approvals", relativeUrl: "/approvals/pcell" },
    ],
};
