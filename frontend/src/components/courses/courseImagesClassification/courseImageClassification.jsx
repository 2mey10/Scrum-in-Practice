import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
function CourseImageClassification() {
    const navigate = useNavigate()
    return (
        <div>
            <Typography variant={"h1"}>
                This is the dummy page for course Images!
            </Typography>
        </div>
    );
}
export default CourseImageClassification;