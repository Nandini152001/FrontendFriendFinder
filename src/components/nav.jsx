import { useRadioGroup } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginAction } from "../actions/loginActions";

const Nav = () => {
  let myStyle = {
    backgroundColor: "#91108be3",
  };
  // get login details from store
  const user = useSelector((state) => state.login.user);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={myStyle}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <i className="bi bi-people"></i>Friend Finder
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              {user.login && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {user.login && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/post">
                    Post
                  </NavLink>
                </li>
              )}
              {user.login && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/poll">
                    Poll
                  </NavLink>
                </li>
              )}
              {user.login && user.role == "User" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/viewComplaint">
                    Complaint
                  </NavLink>
                </li>
              )}
              {user.login && user.role == "Admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminComplaint">
                    Admin Complaint
                  </NavLink>
                </li>
              )}
              {user.login && user.role == "Admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/userControl">
                    Block User
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
              </li> */}

              {user.login && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    User
                  </NavLink>
                </li>
              )}
              {user.login && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
