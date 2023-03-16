import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const history = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            history("/");
        } else {
            alert("Something went wrong!");
        }
    };

    const registerUser = async (username, password, email,mNr,name,nachname,adresse,austausch,gebDatum,studiengang,prüfungsordnung,
                                anrechnung_des_Moduls,tutor_token) => {
        const body = {
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
            creditingofthemodule:anrechnung_des_Moduls,
            tutortoken:tutor_token
        }
        console.log("trying to register")
        console.log(body)
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (response.status === 201) {

            history("/login");
            console.log("registrated with following data:")
            console.log(body)
            console.log(response)
        } else {
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
