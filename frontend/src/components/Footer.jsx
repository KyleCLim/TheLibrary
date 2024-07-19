import React from "react";
import Logo from "../img/library_logo.png";

const Footer = () => {
    const yearNow = new Date().getFullYear();

    return (
        <footer>
            <img src={Logo} alt="logo" />
            <span>Kyle Clarenz © {yearNow}. Made with <b>React.js</b></span>
        </footer>
    );
};

export default Footer;