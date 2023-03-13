import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Grid } from '@mui/material';

const CreateChallenge = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [trainDatasetUrl, setTrainDatasetUrl] = useState('');
    const [testDatasetUrl, setTestDatasetUrl] = useState('');
    const [metricChoices, setMetricChoices] = useState(['Accuracy','Precision','Recall']);
    const [roleChoices, setRoleChoices] = useState(["Classification","Regression"]);
    const [courseChoices, setCourseChoices] = useState(["CV","INF","ING INF"]);
    const [startingTime, setStartingTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    const handleCreateChallenge = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title_text', title);
        formData.append('description_text', description);
        formData.append('train_dataset_url', trainDatasetUrl);
        formData.append('test_dataset_url', testDatasetUrl);
        formData.append('starting_time', startingTime);
        formData.append('end_time', endTime);
        formData.append('cover_image', coverImage);

        metricChoices.forEach((choice) => formData.append('metric_choices', choice));
        roleChoices.forEach((choice) => formData.append('role_choices', choice));
        courseChoices.forEach((choice) => formData.append('course_choices', choice));

        try {
            const response = await fetch.post('/api/challenges/create/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
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
                            onChange={(e) => setStartingTime(e.target.value)}
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
                            onChange={(e) => setEndTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Metric Choices</Typography>
                        {metricChoices.map((choice) => (
                            <FormControlLabel key={choice.id} control={<Checkbox />} label={choice} />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Role Choices</Typography>
                        {roleChoices.map((choice) => (
                            <FormControlLabel key={choice.id} control={<Checkbox />} label={choice} />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Course Choices</Typography>
                        {courseChoices.map((choice) => (
                            <FormControlLabel key={choice.id} control={<Checkbox />} label={choice} />
                        ))}
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