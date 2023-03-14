import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./CoursesOverview.css";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import { useParams } from 'react-router-dom'
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
    const challenges = [1,2,3,4,5,6,7]
    const {courseID} = useParams()
    const title = "Course " + courseID
    // fetch more information about literally everything through the api endpoint
    console.log(courseID)
    return (
        <div >
            <Typography variant={"h1"}>
                {title}
            </Typography>

            <div className="course-container">
                {challenges.map((course) => (
                    <ChallengeElement/>
                ))}
            </div>


        </div>

    );
}
export default CoursesOverview;