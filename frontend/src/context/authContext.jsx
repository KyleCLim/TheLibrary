import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    ); //This line of code get's the current user's info

    const login = async (inputs) => {
        const res = await axios.post(
            "http://localhost:8800/api/auth/login/",
            inputs,
            { withCredentials: true }
        );
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
    };

    const logout = async (inputs) => {
        await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        // console.log("here", currentUser);
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
