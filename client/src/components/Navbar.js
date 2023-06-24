import React from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo_equip9 from "./Assest/logo_equip9.svg";
import "./Assest/style.css";

const Landing = ({ history }) => {
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    history.push(`/`);
  };

  const loginRegLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  );

  const userLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          User
        </Link>
      </li>
      <li className="nav-item">
        <a href="" onClick={logOut} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav> */}

      <Navbar className="bg-body-tertiary navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <Navbar.Brand href="#home">
          <ul className="navbar-nav">
            <li className="nav-item width:50px height:50px color:#ffd541">
              <Link to="/" className="nav-link">
                <img
                  alt=""
                  src={logo_equip9}
                  width="85px"
                  style={{
                    filter:
                      "invert(98%) sepia(28%) saturate(5919%) hue-rotate(321deg) brightness(101%) contrast(103%)",
                  }}
                  className="d-inline-block align-middle"
                />{" "}
                <span>
                  <p className="logoSpan">
                    Connnecting Equipment To Your Business
                  </p>
                </span>
              </Link>
            </li>
          </ul>
        </Navbar.Brand>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {localStorage.usertoken ? userLink : loginRegLink}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Landing);
