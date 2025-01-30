import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // ✅ Import App.js
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById("root")
);


const root = document.createElement('div');
root.innerHTML = `
`;

document.body.appendChild(root);
