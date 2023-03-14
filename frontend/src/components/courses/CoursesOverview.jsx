import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./CoursesOverview.css";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import { redirect } from "react-router-dom";

function CourseElement(props) {

    const navigate = useNavigate();
    const courseID = props.courseID;
    return (
        <div className="course-element">
            <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/hörsaal.jpg"
                        alt="no image"
                        onClick={() => navigate(`/courses/${courseID}`)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Course
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
    const courses = [1,2,3,4,5]
    const challenges = [1,2,3,4,5,6,7]
    return (
        <div >
            <Typography variant={"h1"}>
                Courses
            </Typography>

            <div className="course-container">
                {courses.map((course) => (
                    <CourseElement courseID ={course} />
                ))}
                {challenges.map((challenge) => (
                    <ChallengeElement/>
                ))}
            </div>


        </div>

    );
}
export default CoursesOverview;