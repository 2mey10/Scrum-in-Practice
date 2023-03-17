import React, {useState, useEffect, useContext} from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Grid } from '@mui/material';
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const CreateChallenge = () => {



    // Die listen von Datenbank abrufen hinzufügen.

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [trainDatasetUrl, setTrainDatasetUrl] = useState('');
    const [testDatasetUrl, setTestDatasetUrl] = useState('');
    const [metricChoices, setMetrics] = useState([]);
    const [selectedmetrics, setSelectedMetrics] = useState([]);
    const [roleChoices, setRole] = useState([]);
    const [selectedrole, setSelectedrole] = useState([]);
    const [courseChoices, setCourse] = useState([]);
    const [selectcourse, setSelectcourse] = useState([]);
    const [startingTime, setStartingTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [editcourse, setEditCourse] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDetails, setCourseDetails] = useState('');


    useEffect(() => {
        const fetchMetrics = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/metric/");
            const data = await response.json();
            console.log(data);
            setMetrics(data);
        };
        fetchMetrics();
    }, []);
    useEffect(() => {
        const fetchRoles = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/roles/");
            const data = await response.json();
            // console.log(data);
            setRole(data);
        };
        fetchRoles();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/courses/");
            const data = await response.json();
            // console.log(data);
            setCourse(data);
        };
        fetchData();
    }, []);

    const handleEndTimeChange = (e) => {
        if (startingTime && e.target.value < startingTime) {
            // End time cannot be before starting time
            alert('End time cannot be before starting time');
            return;
        }
        setEndTime(e.target.value);
    };

    const handleStartingTimeChange = (e) => {
        if (endTime && e.target.value > endTime) {
            // Starting time cannot be after end time
            alert('Starting time cannot be after end time');
            return;
        }
        setStartingTime(e.target.value);
    };

    const handleAddCourse = async (event) => {
        try {

            const response = await fetch('http://127.0.0.1:8000/api/courses/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course_name: courseName,
                    course_description: courseDetails
                })
            });
            console.log(response);
            setEditCourse(false);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    const [selectedFileTrain, setSelectedFileTrain] = React.useState(null);
    const [selectedFileTest, setSelectedFileTest] = React.useState(null);


    const handleFileSelectTrain = (event) => {
        setSelectedFileTrain(event.target.files[0])
    }
    const handleFileSelectTest = (event) => {
        setSelectedFileTest(event.target.files[0])
    }

    const handleSubmitAllData = async(event) => {
        event.preventDefault()

        let first_response = {};
        try {
            //upload the datasets
            const datasets = {
                train_dataset_url: selectedFileTrain,
                test_dataset_url: selectedFileTest
            }
            console.log("datasets")
            console.log(datasets)
            const response = await axios({
                method: "post",
                url:"http://127.0.0.1:8000/api/traindata/",
                headers: { "Content-Type": "multipart/form-data" },
                data: datasets
            });
            console.log("first response)")
            console.log(response)
            first_response = response;

        } catch(error) {
            console.log("dataset upload failed")
            console.log(error)
        }


        const body = {
            description_text: description,
            title_text: title,
            train_dataset_url: first_response.data.id,
            test_dataset_url: first_response.data.id,
            metric_choices: selectedmetrics,
            role_choices: selectedrole,
            course_choices: selectcourse,
            starting_time: startingTime,
            end_time: endTime,
            cover_image: coverImage,
            is_human: false,
            min_classification: 10,
            max_classification:100
        }

        try {
            console.log("body")
            console.log(body)
            const response = await axios({
                method: "post",
                url:"http://127.0.0.1:8000/api/challenge/",
                headers: { "Content-Type": "application/json" },
                data: body
            });
            console.log(response)
        } catch(error) {
            console.log("challenge creation failed")
            console.log(error)
        }

    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmitAllData}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create Challenge
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Training Set
                        </Typography>
                        <form style={{paddingTop:"70px"}}>
                            <input type="file" onChange={handleFileSelectTrain}/>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Testing Set
                        </Typography>
                        <form style={{paddingTop:"70px"}}>
                            <input type="file" onChange={handleFileSelectTest}/>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Starting Time"
                            fullWidth
                            margin="normal"
                            type="datetime-local"
                            value={startingTime}
                            onChange={handleStartingTimeChange}
                            InputLabelProps={{ shrink: true }}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="End Time"
                            fullWidth
                            margin="normal"
                            type="datetime-local"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            InputLabelProps={{ shrink: true }}
                            required={true}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Metric Choices</Typography>
                            {metricChoices.map((choice) => (
                                <FormControlLabel
                                    key={choice.id}
                                    control={
                                        <Checkbox
                                            checked={selectedmetrics.includes(choice)}
                                            onChange={(event) => {
                                                const newSelectedMetrics = event.target.checked
                                                    ? [...selectedmetrics, choice]
                                                    : selectedmetrics.filter((metric) => metric.id !== choice.id);
                                                setSelectedMetrics(newSelectedMetrics);
                                            }}
                                            name={choice.metric_name}
                                        />
                                    }
                                    label={choice.metric_name}
                                />
                            ))}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Type of task</Typography>
                            {roleChoices.map((choice) => (
                                <FormControlLabel
                                    key={choice.id}
                                    control={
                                        <Checkbox
                                            checked={selectedrole.includes(choice)}
                                            onChange={(event) => {
                                                const newSelectedRole = event.target.checked
                                                    ? [...selectedrole, choice]
                                                    : selectedrole.filter((role) => role.id !== choice.id);
                                                setSelectedrole(newSelectedRole);
                                            }}
                                            name={choice.role_name}
                                        />
                                    }
                                    label={choice.role_name}
                                />
                            ))}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Course for:</Typography>
                            {courseChoices.map((choice) => (
                                <FormControlLabel
                                    key={choice.id}
                                    control={
                                        <Checkbox
                                            checked={selectcourse.includes(choice)}
                                            onChange={(event) => {
                                                const newSelectedCouse = event.target.checked
                                                    ? [...selectcourse, choice]
                                                    : selectcourse.filter((Course) => Course.id !== choice.id);
                                                setSelectcourse(newSelectedCouse);
                                            }}
                                            name={choice.course_name}
                                        />
                                    }
                                    label={choice.course_name}
                                />
                            ))}
                            <Button onClick={() => {
                                setEditCourse(!editcourse);
                            }} variant="outlined" color="primary">
                                +
                            </Button>
                            {
                                editcourse &&
                                <div>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Course Name"
                                            fullWidth
                                            margin="normal"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Course Details"
                                            fullWidth
                                            margin="normal"
                                            value={courseDetails}
                                            onChange={(e) => setCourseDetails(e.target.value)}
                                        />
                                    </Grid>
                                    <Button onClick={() => {
                                        console.log(courseName)
                                        handleAddCourse();

                                    }} variant="outlined" color="primary">
                                        Add course
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <input*/}
                    {/*        accept="image/*"*/}
                    {/*        type="file"*/}
                    {/*        style={{ display: 'none' }}*/}
                    {/*        id="cover-image"*/}
                    {/*        onChange={(e) => setCoverImage(e.target.files[0])}*/}
                    {/*    />*/}
                    {/*    <label htmlFor="cover-image">*/}
                    {/*        <Button variant="contained" color="primary" component="span">*/}
                    {/*            Upload Cover Image*/}
                    {/*        </Button>*/}
                    {/*    </label>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Challenge
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateChallenge;