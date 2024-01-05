import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAction, selectUser } from "../redux/user/userSlice";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log("user", user);
  const logoutFun = () => {
    dispatch(logoutUserAction({ navigate }));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <a className="navbar-brand text-white" href="/">
          MERN APP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/student">
                All Student
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/lecturer">
                All Lecturer
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/module">
                All Modules
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/file">
                Add Lecturer-Material
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/modulefile/">
                Add Module-Submission
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link text-white" to="/studentfile/">
                Add Student Module-Submission
              </Link>
            </li>
          </ul>
        </div>
        {user.email && (
          <div className="logout">
            <Stack spacing={2} direction="row">
              <Button variant="contained" id="logoutBtn" onClick={logoutFun}>
                log out
              </Button>
            </Stack>
          </div>
        )}
      </div>
    </nav>
  );
}
