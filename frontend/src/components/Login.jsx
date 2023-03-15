import React, { useState, createContext,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("trying to log in")
        try {
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/login/",
                headers: {"Content-Type": "multipart/form-data"},
                data: {username: username, password: password}
            });
            console.log(response.data);
        }
        catch(error) {
            console.log("login failed")
            console.log(error)
            alert("Worng user name or password please try again")
        }
        setIsLoading(false);
    }

    return (
        <Container maxWidth="sm" style={{ minHeight: "100vh" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextField id="username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" required />
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
                    <Button type="submit" variant="contained" color="primary" disabled={isLoading} style={{ marginTop: "16px" }}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                </form>
                <div style={{ marginTop: "16px" }}>
                    <Typography variant="body2" color="textSecondary"><a href="/Register">Don't have an account?</a></Typography>
                </div>
            </div>
        </Container>
    );
}

export default Login;
