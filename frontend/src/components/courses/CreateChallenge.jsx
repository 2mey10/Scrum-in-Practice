import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Grid } from '@mui/material';

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
                })
            });
            console.log(response);
            setEditCourse(false);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCreateChallenge = async (event) => {
        event.preventDefault();
        console.log(description,
            title,
            trainDatasetUrl,
            testDatasetUrl,
            selectedmetrics,
            selectedrole,
            selectcourse,
            startingTime,
            endTime,
            coverImage)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/challenge/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description_text: description,
                    title_text: title,
                    train_dataset_url: trainDatasetUrl,
                    test_dataset_url: testDatasetUrl,
                    metric_choices: selectedmetrics,
                    role_choices: selectedrole,
                    course_choices: selectcourse,
                    starting_time: startingTime,
                    end_time: endTime,
                    cover_image: coverImage
                })
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleCreateChallenge}>
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
                        <TextField
                            label="Training Dataset URL"
                            fullWidth
                            margin="normal"
                            value={trainDatasetUrl}
                            onChange={(e) => setTrainDatasetUrl(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Test Dataset URL"
                            fullWidth
                            margin="normal"
                            value={testDatasetUrl}
                            onChange={(e) => setTestDatasetUrl(e.target.value)}
                        />
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
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            type="file"
                            style={{ display: 'none' }}
                            id="cover-image"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                        />
                        <label htmlFor="cover-image">
                            <Button variant="contained" color="primary" component="span">
                                Upload Cover Image
                            </Button>
                        </label>
                    </Grid>
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