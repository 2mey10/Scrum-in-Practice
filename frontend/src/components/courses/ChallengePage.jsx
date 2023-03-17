import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AuthContext from "../../context/AuthContext";
import {Dialog, Grid, List, ListItem, ListItemText, TextField} from "@mui/material";
import axios from "axios";
import Ranking from "../Ranking";

function DetailedChallenge() {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)


    // fetch challenges data
    const [challenges, setChallenges] = useState([]);

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



    const {challengeID} = useParams()
    let data = {}
    console.log("list of challenges")
    console.log(challenges)
    challenges.forEach((challenge)=>{
        if (challenge.id === Number(challengeID)){
            data = challenge
        }
        })

    console.log("DATAAAAA")
    console.log(data)

    let props = {
        title:"titlE",
        description:"desdasdas",
        data:{
            "id": 1,
            "description_text": "testasdasdas",
            "title_text": "test",
            "train_dataset_url": "http://127.0.0.1:8000/media/traindata/test_56XfYMh.zip",
            "test_dataset_url": "http://127.0.0.1:8000/media/testdata/test_o7dHhO6.zip",
            "metric_choices": [
                {
                    "id": 1,
                    "metric_name": "Accuracy",
                    "metric_formular": "acc"
                }
            ],
            "role_choices": [
                {
                    "id": 1,
                    "role_name": "Classification"
                }
            ],
            "course_choices": [
                {
                    "id": 1,
                    "course_name": "Informatik",
                    "course_description": ":)"
                }
            ],
            "starting_time": "2023-03-06T18:23:00Z",
            "end_time": "2023-03-16T18:23:00Z",
            "cover_image": null,
            "is_human": false,
            "min_classification": 10,
            "max_classification": 100
        }
    }

    console.log("props challenge element")
    console.log(props)
    // styling
    const textfieldLength = "400px";

    // const metrics = [];
    // data.metric_choices.map((metric)=>{
    //     metrics.push(metric.metric_name)
    // })
    //props.data = data;

    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);

    const renderButton = () => {
        return user?(

            <>
                <Grid xs={6} sx={{display:"flex",justifyContent:"center"}}>
                    <Button variant="contained" sx={{width:"90%"}} onClick={handleSubmit} disabled={false}>
                        Submit Model
                    </Button>
                </Grid>
            </>) : (
            <>
                <Grid xs={6} sx={{display:"flex",justifyContent:"center"}}>
                    <Button variant="contained" sx={{width:"90%"}} onClick={handleSubmit} disabled={true}>
                        Log in to compete!
                    </Button>
                </Grid>
            </>

        )
    }

    const baseURL = "http://127.0.0.1:8000/api/"
    const handleSubmit = async(event) => {
        event.preventDefault()
        let first_respone = {}
        try {
            const response = await axios({
                method: "post",
                url: baseURL+"mlmodel/",
                headers: { "Content-Type": "multipart/form-data" },
                data: {
                    ml_model: selectedFile
                }
            });
            console.log("uploaded model!")
            console.log(response)
            first_respone = response;
        } catch(error) {
            console.log("model upload failed")
            console.log(error)
        }

        console.log(first_respone.data)
        let body = {
            ml_model_id: first_respone.data.id,
            challenge_id: data.id,
            username: user.username
        }
        console.log("second request with:")
        console.log(body)
        try {
            const response = await axios({
                method: "post",
                url: baseURL+"makeEntry",
                //data: formData,
                headers: { "Content-Type": "multipart/form-data" },
                data: body
            });
            console.log("pinged second endpoint and started evaluation!")
            console.log(response)
        } catch(error) {
            console.log("second endpoint was not reached")
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div>
            <Typography variant={"h1"} justifyContent="center" display="flex">
                {data.description_text}
            </Typography>
            <Typography variant={"h4"} color="#808080" justifyContent="center" display="flex">
                {data.title_text}
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
                                    defaultValue={data.train_dataset_url}
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
                                    defaultValue={data.test_dataset_url}
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
                                {challenges.map((challenge)=>(
                                    <ListItem sx={{margin:"3px"}}>
                                        <ListItemText
                                            primary={challenge.metrics}
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
                        {renderButton()}
                    </Grid>

                </div>
            </div>
            <div>
                <Ranking/>
            </div>
        </div>
    );
}


function ChallengePage() {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)

    return (
        <div>

           <Typography variant="h1">
               challenge page
           </Typography>

            <DetailedChallenge/>

        </div>
    );
}
export default ChallengePage;