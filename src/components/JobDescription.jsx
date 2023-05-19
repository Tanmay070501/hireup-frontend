import { Typography } from "@mui/material";
import React, { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

function JobDescription({ placeholder, content, setContent }) {
    const editor = useRef(null);
    //console.log(content);
    const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || "Start typings...",
        };
    }, [placeholder]);
    return (
        <div>
            <Typography my={2}>Job Description:</Typography>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={0} // tabIndex of textarea
                //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => setContent(newContent)}
            />
        </div>
    );
}

export default JobDescription;
