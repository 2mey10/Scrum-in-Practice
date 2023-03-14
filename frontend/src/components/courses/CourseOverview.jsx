import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./CoursesOverview.css";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import ChallengeElement from "./ChallengeElement";



function CoursesOverview(props) {

    const baseURL = "http://127.0.0.1:8000/api/"

    const [courses, setCourses] = useState([]);
    const [challenges, setChallenges] = useState([]);

    const {courseID} = useParams()

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
    console.log(`data: ${courses}`);

    // filter courses by the current ID
    let selectedCourseTitle = "";
    let selectedCourseDescription = "Empty Description lol";
    courses.forEach((obj)=>{
        if (obj.id === Number(courseID)) {
            console.log("found the one")
            selectedCourseTitle=obj.course_name
            selectedCourseDescription=obj.course_description
        }
        console.log(obj.id)
        console.log(courseID)
    });

    // filter challenges whether they apply for current course
    let selectedChallenges = []
    challenges.forEach((obj)=>{
        obj.course_choices.forEach((choice)=>{
            if (choice.id === Number(courseID)){
                selectedChallenges.push(obj)
            }
        })
    })

    return (
        <div >
            <Typography variant={"h1"}>
                {selectedCourseTitle}
            </Typography>
            <div className="course-description">
                <Typography variant={"h4"} color="#808080">
                    {selectedCourseDescription}
                </Typography>
            </div>

            <div className="course-container">
                {selectedChallenges.map((challenge) => (
                    <ChallengeElement
                        title={challenge.title_text}
                        description_text={challenge.description_text}
                        data = {challenge}
                    />
                ))}
            </div>


        </div>

    );
}
export default CoursesOverview;