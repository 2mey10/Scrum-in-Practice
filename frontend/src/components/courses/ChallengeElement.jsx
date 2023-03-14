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
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";
import {CheckBox} from "@mui/icons-material";
import Button from "@mui/material/Button";
import axios from "axios";

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

    function submitRequest(){
        console.log("Submitting data to the api ;)")
    }

    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);


    const baseURL = "http://127.0.0.1:8000/api/"
    const handleSubmit = async(event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: baseURL+"mlmodel/",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch(error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

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
                    <Grid container rowSpacing={1} paddingY="30px">
                        <Grid xs={6}>
                            <Typography variant="h5" sx={{display:"flex", justifyContent:"center"}}>
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
                        </Grid>
                        <Grid xs={6}>
                            <Typography variant="h5"sx={{display:"flex", justifyContent:"center"}}>
                                Metrics
                            </Typography>
                            <List sx={{display:"flex"}}>
                                {metrics.map((metric)=>(
                                    <ListItem sx={{margin:"3px"}}>
                                        <ListItemText
                                            primary={metric}
                                            secondary={"Metric description"}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid xs={6} sx={{display:"flex",justifyContent:"center"}}>
                            <form style={{paddingTop:"70px"}}>
                                <input type="file" onChange={handleFileSelect}/>
                            </form>
                        </Grid>
                        <Grid xs={6} sx={{display:"flex",justifyContent:"center"}}>
                            <Button variant="contained" sx={{width:"90%"}} onClick={handleSubmit}>
                                Submit Model
                            </Button>

                        </Grid>
                    </Grid>




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
    console.log("challenge element data")
    console.log(props.data)

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