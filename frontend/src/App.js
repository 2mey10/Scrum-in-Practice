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
import Home from "./components/Home";
import ToBeImplemented from "./components/ToBeImplemented";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from './components/Register';
import CreateChallenge from './components/courses/CreateChallenge';
import CoursesOverview from "./components/courses/CoursesOverview";
import CourseOverview from "./components/courses/CourseOverview";


function App() {
  return (
    <div className="App">

        <Navbar/>
        <Router>
            <Routes>
                <Route element={<CoursesOverview/>} path="/courses"/>
                <Route element={<CourseOverview />} path="/courses/:courseID"/>
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<ToBeImplemented/>} path="/register" />
                <Route element={<CreateChallenge/>} path="/CreateChallenge" />
                <Route element={<Home />} path="/" />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
