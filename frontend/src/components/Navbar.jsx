import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { BrowserRouter as Router } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import Box from "@mui/material/Box";

const pages_logged_in = ['Courses','CreateChallenge','Ranking'];
const pages_logged_out = ['Courses', 'Login','Register','CreateChallenge','Ranking'];
const applicationName = "Machine Learning Meisterschaft Magdeburg"
function ResponsiveAppBar() {
    // const user = false;
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)

    const navbar_style = {
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
    }

    const fetchLoginStatus = () => {
        return user?(

            <>
                <Button
                    key={"Logout"}
                    onClick={logoutUser}
                    sx={{ my: 2, color: '#063970', display: 'block' }}
                >
                    {"Logout"}
                </Button>
                <Box>
                    <Typography>
                        Logged in
                    </Typography>
                </Box>
            </>) : (
            <>
                <Box >
                    <Typography>
                        Logged out
                    </Typography>
                </Box>

            </>
        )
    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PsychologyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {applicationName}
                    </Typography>

                    {/*show pages*/}
                    {/*<Router>*/}
                        {user ? pages_logged_in.map((page) => (
                            <Button
                                key={page}
                                component="a"
                                href={`/${page.toLowerCase()}`}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        )):pages_logged_out.map((page) => (
                            <Button
                                key={page}
                                component="a"
                                href={`/${page.toLowerCase()}`}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}

                    {/*</Router>*/}



                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={navbar_style}
                    >
                        TEST
                    </Typography>
                    {fetchLoginStatus()}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;