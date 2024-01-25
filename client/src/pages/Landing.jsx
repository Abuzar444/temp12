import React from "react";
import { Link, Outlet } from "react-router-dom";

import Wrapper from "../assets/wrappers/landingPage";
import projectTracker from "../assets/images/main.svg";
import Logo from "../components/Logo.jsx";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo
          style={{ position: "absolute", left: 20, top: -40, width: 200 }}
        />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Project <span>tracking</span> app
          </h1>
          <h3>
            Water <span>Tech</span> Central
          </h3>
          <p>Keeping track of our projects at water tech central</p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={projectTracker} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
