import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { AuthContextProvider } from "./context/authContext.jsx";
import { Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <AuthContextProvider> */}
        <App />
        {/* </AuthContextProvider> */}
    </React.StrictMode>
);
