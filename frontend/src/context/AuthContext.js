import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:5000/profile", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                setUser(null);
                localStorage.removeItem("token");
            });
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            return true;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.error || error.message);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
