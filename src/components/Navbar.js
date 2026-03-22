import React from 'react';
import "./Navbar.css";

function Navbar(){
    return (
        <nav className="navbar">
            <h2 className="logo">Abhinay Pal.</h2>

            <ul className="nav-links">
                <li>Home</li>
                <li>Portfolio</li>
                <li>Resume</li>
                <li className="active">About me</li>
            </ul>
        </nav>
    );
}

export default Navbar;