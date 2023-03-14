import {
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    Dialog,
    DialogTitle, FormControlLabel, FormGroup, List, ListItem, ListItemText,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./ChallengeElement.css";
import CoursesOverview from "./CourseOverview";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";
import {CheckBox} from "@mui/icons-material";

function DetailedChallenge(props) {
    const { onClose, open,title, description, data} = props;
    const handleClose = () => {
        onClose();
    };

    console.log("props challenge element")
    console.log(props)
    // styling
    const textfieldLength = "400px";
    const metrics = [];
    props.data.metric_choices.forEach((metric)=>{
        metrics.push(metric.metric_name)
    })

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"lg"}>
            <Typography variant={"h1"} justifyContent="center" display="flex">
                {props.title}
            </Typography>
            <Typography variant={"h4"} color="#808080" justifyContent="center" display="flex">
                {props.description}
            </Typography>
            <div className="outer-container">
                <div className="container">
                    <Typography variant="h5" paddingX="20px" paddingY="10px">
                        Datasets
                    </Typography>
                    <div className="container-element">
                        <TextField
                            id="outlined-read-only-input"
                            label="Training Dataset"
                            sx={{maxWidth:textfieldLength,minWidth:textfieldLength}}
                            defaultValue={props.data.train_dataset_url}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </div>
                    <div className="container-element">
                        <TextField
                            id="outlined-read-only-input"
                            label="Test Dataset"
                            sx={{maxWidth:"400px",minWidth:"400px"}}
                            defaultValue={props.data.test_dataset_url}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h5" paddingX="20px">
                            Metrics
                        </Typography>
                        <List>
                            {metrics.map((metric)=>(
                                <ListItem>
                                    <ListItemText
                                        primary={metric}
                                        // secondary={"Description"}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>



                </div>

            </div>
        </Dialog>
    );
}



function ChallengeElement(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="course-element">
            <ButtonBase onClick={handleClickOpen}>
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
            </ButtonBase>
            <DetailedChallenge
                open={open}
                onClose={handleClose}
                title={props.title}
                description={props.description_text}
                data ={props.data}
            />
        </div>

    );
}

export default ChallengeElement;