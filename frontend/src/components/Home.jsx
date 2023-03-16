import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
function Home() {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)

    const customGreeting = () => {
        return user?(
            <>
                <Typography variant={"h3"}>
                    Welcome {user.username} to the Magdeburger Machine Learning Meisterschaft!
                </Typography>
            </>) : (
            <>
                <Typography variant={"h3"}>
                    Welcome to the Magdeburger Machine Learning Meisterschaft!
                    Log in to compete or go to courses to view the challenges.
                </Typography>
            </>
        )
    }
    return (
        <div>

            {customGreeting()}

        </div>
    );
}
export default Home;