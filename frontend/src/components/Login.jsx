import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

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
                    <Typography variant="body2" color="textSecondary"><a href="#">Don't have an account?</a></Typography>
                </div>
            </div>
        </Container>
    );
}

export default Login;
