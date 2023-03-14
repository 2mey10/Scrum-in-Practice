import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./CoursesOverview.css";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
function ChallengeElement(props) {
    return (
        <div className="course-element">
            <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/unibib.png"
                        alt="no image"
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
        </div>

    );
}


function CoursesOverview(props) {

    const baseURL = "http://127.0.0.1:8000/api/"
    const [data, setData] = useState([]);

    const {courseID} = useParams()
    const title = "Course " + courseID



    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    baseURL + `challenge/`
                );
                console.log("fetched data");
                setData(response.data);
            } catch (err) {
                console.log(err.message);
                console.log("error in fetching data")
                setData(null);
            }
        };
        getData();
    }, []);
    console.log(`data: ${data}`);

    return (
        <div >
            <Typography variant={"h1"}>
                {title}
            </Typography>

            <div className="course-container">
                {data.map((course) => (
                    <ChallengeElement
                        title={course.title_text}
                        description_text={course.description_text}/>
                ))}
            </div>


        </div>

    );
}
export default CoursesOverview;