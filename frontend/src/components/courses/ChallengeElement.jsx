import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CoursesOverview from "./CourseOverview";

function ChallengeElement(props) {
    return (
        <div className="course-element">
            <Card sx={{height:300, width:300}}>
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

export default ChallengeElement;