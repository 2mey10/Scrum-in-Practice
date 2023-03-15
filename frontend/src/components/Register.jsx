import React, {useContext, useState} from 'react';
import { Container, TextField, Button, Typography, Grid, InputLabel, Select, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import AuthContext from "../context/AuthContext";

function Register() {

    const { registerUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mNr, setMNr] = useState(0);
    const [name, setName] = useState('');
    const [nachname, setNachname] = useState('');
    const [gebDatum, setGebDatum] = useState('');
    const [adresse, setAdresse] = useState('');
    const [austausch, setAustausch] = useState('');
    const [studiengang, setStudiengang] = useState('');
    const [prüfungsordnung, setPrüfungsordnung] = useState('');
    const [anrechnung_des_Moduls, setAnrechnung_des_Moduls] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        console.log("registrating...")
        e.preventDefault();
        registerUser(username, password, email,mNr,name,nachname,adresse,austausch,gebDatum,studiengang,prüfungsordnung,
            anrechnung_des_Moduls,);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(username,password,email,mNr,name,nachname,adresse,austausch,gebDatum.slice(0, 10),studiengang,prüfungsordnung,anrechnung_des_Moduls)
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                firstname:name,
                lastname:nachname,
                matriculationnumber:mNr,
                studentstatus:austausch,
                Courseofstudies:studiengang,
                exsam:prüfungsordnung,
                email:email,
                password:password,
                birthday:gebDatum.slice(0, 10),
                address:adresse,
                creditingofthemodule:anrechnung_des_Moduls
            })
        });

        setIsLoading(false);

        if (response.ok) {
            window.location.href = '/login';
        } else {
            const data = await response.json();
            setError(data.message);
        }
    };


    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                {error && <Typography variant="body1" color="error" gutterBottom>{error}</Typography>}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z0-9_-]{5,16}$",
                                title: "Username should be 5-16 characters long and can only contain letters, numbers, underscores, and dashes."
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            // inputProps={{
                            //     pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                            //     title: "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
                            // }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            inputProps={{
                                pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
                                title: "Please enter a valid email address."
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Matrikelnummer"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={mNr}
                            onChange={(e) => setMNr(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[0-9]{6}$",
                                title: "Matrikelnummer should be exactly 6 digits long and can only contain numbers."
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z ]{2,}$",
                                title: "Name should contain only letters and be at least 2 characters long."
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nachname"
                            fullWidth
                            margin="normal"
                            value={nachname}
                            onChange={(e) => setNachname(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z ]{2,}$",
                                title: "Last Name should contain only letters and be at least 2 characters long."
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Geburtsdatum" fullWidth margin="normal" type="datetime-local" value={gebDatum} InputLabelProps={{ shrink: true }} onChange={(e) => setGebDatum(e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Adresse" fullWidth margin="normal" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Studiengang"
                            fullWidth
                            margin="normal"
                            value={studiengang}
                            onChange={(e) => setStudiengang(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z ]{2,}$",
                                title: "The field of study should contain only letters and be at least 2 characters long."
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Prüfungsordnung"
                            fullWidth
                            margin="normal"
                            value={prüfungsordnung}
                            onChange={(e) => setPrüfungsordnung(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z0-9 ]{2,}$",
                                title: "The Examination regulations should contain only letters and be at least 2 characters long."
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Anrechnung des Moduls"
                            fullWidth
                            margin="normal"
                            value={anrechnung_des_Moduls}
                            onChange={(e) => setAnrechnung_des_Moduls(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[a-zA-Z ]{2,}$",
                                title: "The Crediting of the module should contain only letters and be at least 2 characters long."
                            }}
                        />
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
                                <option value={'Extern'}>No</option>
                                <option value={'Intern'}>Yes</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                disabled={true}
                                label={
                                    <span>
                                        Ich stimme der <a href="https://www.ovgu.de/datenschutzerklaerung.html">AGBs</a> zu
                                    </span>
                                }
                                required
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading} style={{ marginTop: "16px" }}>
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
            </form>
            <div style={{ marginTop: "16px" }}>
                <Typography variant="body2" color="textSecondary"><a href="/Login">Already have an account?</a></Typography>
            </div>
        </Container>
    );
}

export default Register;
