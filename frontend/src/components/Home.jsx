import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from "react-router-dom";
function Home() {
    return (
        <div>
            <Typography variant={"h1"}>
                This is the default home page!
            </Typography>
        </div>
    );
}
export default Home;