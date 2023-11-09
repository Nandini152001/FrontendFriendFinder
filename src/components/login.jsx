import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/loginActions";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errRes, setErrRes] = useState("");
  const [errors, setErrors] = useState({});

  //Connect store to get login info
  const loginUsr = useSelector((state) => state.login);

  //Step1: Define schema to validate form data
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().regex(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    role: Joi.string().alphanum().min(3).max(30).required(),
  });

  //Step2: Method to validate user against schema
  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(user, schema, {
      abortEarly: true,
    });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    const newUser = { ...user };
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios
    // .post("http://localhost:8081/login", user)
    // .then((res) => {
    //   console.log(res);
    //   navigate("/profile");
    // })
    // .catch((err) => console.log(err));
    setErrors(validate());
    if (errors) return;

    dispatch(loginAction(user));
    if (loginUsr.user.login) {
      navigate("/profile");
    } else {
      setErrRes(loginUsr.errMsg);
    }
  };

  let nandini = {
    backgroundImage:
      'URL("https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "92vh",
  };

  // document.getElementById("login").style.backgroundImage =
  //   "url('https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')";
  return (
    <div id="login" className="" style={nandini}>
      {errRes && (
        <div className="alert alert-danger w-50 mx-auto mt-5 " role="alert">
          {errRes}
        </div>
      )}
      <p className="display-6 text-center bg-opacity-75 w-50 mx-auto p-3 text-white">
        <strong>
          <i class="bi bi-person-circle text-primary display-1"></i>
        </strong>
      </p>
      <form
        className="w-50 mx-auto border p-3 mt-3 shadow-lg bg-opacity-50 p-3 mb-5 bg-body rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.password}</small>}
        </div>
        <div className="mb-3">
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            id="role"
            value={user.role}
            name="role"
            onChange={handleChange}
          >
            <option selected>Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {errors && <small className="text-danger">{errors.role}</small>}
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary bg-opacity-75">
            Submit
          </button>
          <small className="mt-2">
            Don't have account? Click <Link to="/register">here</Link> to
            register
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
