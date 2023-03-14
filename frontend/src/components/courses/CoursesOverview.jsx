import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./CoursesOverview.css";
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import { redirect } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function CourseElement(props) {

    const navigate = useNavigate();

    return (
        <div className="course-element">
            <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/hörsaal.jpg"
                        alt="no image"
                        onClick={() => navigate(`/courses/${props.courseID}`)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This course provides essential information about interesting things you will probably never
                            need in you life :)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    );
}

function ChallengeElement() {
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
                            Challenge
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This challenge provides essential information about interesting things you will probably never
                            need in you life :)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    );
}


function CoursesOverview() {
    const courses_ = [1,2,3,4,5]
    const challenges_ = [1,2,3,4,5,6,7]

    const baseURL = "http://127.0.0.1:8000/api/"
    const [courses, setCourses] = useState([]);
    const [challenges, setChallenges] = useState([]);


    // fetch challenges data
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    baseURL + `challenge/`
                );
                console.log("fetched challenges data");
                setChallenges(response.data);
            } catch (err) {
                console.log(err.message);
                console.log("error in fetching challenges data")
                setChallenges(null);
            }
        };
        getData();
    }, []);

    // fetch courses data
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    baseURL + `courses/`
                );
                console.log("fetched courses data");
                setCourses(response.data);
            } catch (err) {
                console.log(err.message);
                console.log("error in fetching courses data")
                setCourses(null);
            }
        };
        getData();
    }, []);


    console.log(`challenge data`);
    console.log(challenges)
    console.log(`course data`);
    console.log(courses)

    return (
        <div >
            <Typography variant={"h1"}>
                Courses
            </Typography>

            <div className="course-container">
                {courses.map((course) => (
                    <CourseElement
                        courseID ={course.id}
                        title={course.course_name}
                    />
                ))}
                {challenges_.map((challenge) => (
                    <ChallengeElement/>
                ))}
            </div>


        </div>

    );
}
export default CoursesOverview;