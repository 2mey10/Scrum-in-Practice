import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, InputLabel, Select, FormControl } from '@mui/material';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mNr, setMNr] = useState(0);
    const [name, setName] = useState('');
    const [nachname, setNachname] = useState('');
    const [adresse, setAdresse] = useState('');
    const [austausch, setAustausch] = useState(false);
    const [studiengang, setStudiengang] = useState('');
    const [prüfungsordnung, setPrüfungsordnung] = useState('');
    const [anrechnung_des_Moduls, setAnrechnung_des_Moduls] = useState('');
    const [tutorkey,setKey] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email,
                mNr,
                name,
                nachname,
                adresse,
                austausch,
                studiengang,
                prüfungsordnung,
                anrechnung_des_Moduls
            })
        });

        setIsLoading(false);

        if (response.ok) {
            // redirect to success page or show success message
        } else {
            const data = await response.json();
            setError(data.message);
        }
    };


    return (
        <Container maxWidth="sm">
            <form onSubmit={handleRegister}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                {error && <Typography variant="body1" color="error" gutterBottom>{error}</Typography>}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Password" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Matrikelnummer" fullWidth margin="normal" type="number" value={mNr} onChange={(e) => setMNr(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nachname" fullWidth margin="normal" value={nachname} onChange={(e) => setNachname(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Adresse" fullWidth margin="normal" value={adresse} onChange={(e) => setAdresse(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Studiengang" fullWidth margin="normal" value={studiengang} onChange={(e) => setStudiengang(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Prüfungsordnung" fullWidth margin="normal" value={prüfungsordnung} onChange={(e) => setPrüfungsordnung(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Anrechnung des Moduls" fullWidth margin="normal" value={anrechnung_des_Moduls} onChange={(e) => setAnrechnung_des_Moduls(e.target.value)} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="austausch-select">Austausch</InputLabel>
                            <Select
                                native
                                value={austausch}
                                onChange={(e) => setAustausch(e.target.value)}
                                inputProps={{
                                    name: 'austausch',
                                    id: 'austausch-select',
                                }}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Tutor key" fullWidth margin="normal" value={ tutorkey} onChange={(e) => setKey(e.target.value)} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading} style={{ marginTop: "16px" }}>
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
            </form>
            <div style={{ marginTop: "16px" }}>
                <Typography variant="body2" color="textSecondary"><a href="#">Already have an account?</a></Typography>
            </div>
        </Container>
    );
}

export default Register;
