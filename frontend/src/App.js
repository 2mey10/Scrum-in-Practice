import logo from './logo.svg';
import './App.css';
import Typography from "@mui/material/Typography";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Routes, RouterProvider, createRoutesFromElements, createBrowserRouter
} from "react-router-dom";
import CourseImageClassification from "./components/courses/courseImagesClassification/courseImageClassification";
import Home from "./components/Home";
import ToBeImplemented from "./components/ToBeImplemented";
import ErrorPage from "./components/ErrorPage";


function App() {
  return (
    <div className="App">

        <Navbar/>
        <Router>
            <Routes>
                <Route element={<CourseImageClassification/>} path="/courses"/>
                <Route element={<ToBeImplemented />} path="/login" />
                <Route element={<ToBeImplemented/>} path="/register" />
                <Route element={<Home />} path="/" />
            </Routes>
        </Router>


      {/*<Typography variant={"h1"}>*/}
      {/*    Basepage*/}
      {/*</Typography>*/}


    </div>
  );
}

export default App;
