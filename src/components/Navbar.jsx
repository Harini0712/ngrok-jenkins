import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Beans</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Shop</li>
        <li>Contact</li>
      </ul>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
