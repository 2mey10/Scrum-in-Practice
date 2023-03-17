import {
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    Dialog,
    DialogTitle, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./ChallengeElement.css";
import CoursesOverview from "./CourseOverview";
import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link, useNavigate} from "react-router-dom";
import {CheckBox} from "@mui/icons-material";
import Button from "@mui/material/Button";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function ChallengeElement(props) {
    console.log("challenge element data")
    console.log(props.data)
    const navigate = useNavigate();

    return (
        <div className="course-element" >
            <ButtonBase onClick={() => navigate(`/challenges/${props.data.id}`)}>
                <Card sx={{height:300, width:300}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/unibib.png"
                            alt="no image"
                            // onClick={() => navigate(`/challenges/${props.data.id}`)}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.description_text}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ButtonBase>
        </div>

    );
}

export default ChallengeElement;