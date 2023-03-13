import logo from './logo.svg';
import './App.css';
import Typography from "@mui/material/Typography";
import Navbar from "./components/Navbar";
import Login from './components/Login';
function App() {
  return (
    <div className="App">
        <Navbar>

        </Navbar>
      <Typography variant={"h1"}>
          {/* Content */}
          <Login>

          </Login>
      </Typography>


    </div>
  );
}

export default App;
