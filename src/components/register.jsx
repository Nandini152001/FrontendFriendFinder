import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    mobile: "",
    school: "",
    college: "",
    username: "",
    password: "",
    status: "",
    role: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  //Step1: Define schema to validate form data
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    dob: Joi.date().required(),
    password: Joi.string().regex(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    status: Joi.string().alphanum().min(3).max(30).required(),
    role: Joi.string().alphanum().min(3).max(30).required(),
    pincode: Joi.number().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    mobile: Joi.number().required(),
    school: Joi.string().required(),
    college: Joi.string().required(),
    city: Joi.string().required(),
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

    setErrors(validate());
    if (errors) return;

    axios
      .post("http://localhost:8081/user/registration", user)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p
        className="h3 text-center mt-5 bg-primary w-25 mx-auto fw-bold p-3 text-uppercase"
        data-testid="regtitle"
      >
        New User Registration
      </p>
      <form
        className="w-25 mx-auto mt-3 border p-3 mb-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label for="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={user.firstName}
            name="firstName"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.firstName}</small>}
        </div>
        <div className="mb-3">
          <label for="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={user.lastName}
            name="lastName"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.lastName}</small>}
        </div>
        <div className="mb-3">
          <label for="dob" className="form-label">
            DOB
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={user.dob}
            name="dob"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.dob}</small>}
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email Id
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
          <label for="mobile" className="form-label">
            Contact Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            value={user.mobile}
            name="mobile"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.mobile}</small>}
        </div>
        <div className="mb-3">
          <label for="school" className="form-label">
            Name of School
          </label>
          <input
            type="text"
            className="form-control"
            id="school"
            value={user.school}
            name="school"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.school}</small>}
        </div>
        <div className="mb-3">
          <label for="college" className="form-label">
            College Name
          </label>
          <input
            type="text"
            className="form-control"
            id="college"
            value={user.college}
            name="college"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.college}</small>}
        </div>
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={user.username}
            name="username"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.username}</small>}
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
          <label for="status" className="form-label">
            Status
          </label>

          <select
            className="form-select mb-3"
            id="status"
            value={user.status}
            name="status"
            onChange={handleChange}
          >
            <option selected>Status</option>

            <option value="Active">Active</option>
          </select>
        </div>

        <div className="mb-3">
          <label for="role" className="form-label">
            Role
          </label>

          <select
            className="form-select mb-3"
            id="role"
            value={user.role}
            name="role"
            onChange={handleChange}
          >
            <option selected>Role</option>

            <option value="User">User</option>
          </select>
        </div>

        {/*<fieldset disabled>
            <div className="mb-3">
              <label for="status" className="form-label">Status</label>
              <input type="text" id="status" className="form-control" placeholder="Active" value={user.status}
            name="status"
            onChange={handleChange}/>
            </div>
        </fieldset>
       */}
        <div className="mb-3">
          <label for="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={user.city}
            name="city"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.city}</small>}
        </div>
        <div className="mb-3">
          <label for="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={user.state}
            name="state"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.state}</small>}
        </div>
        <div className="mb-3">
          <label for="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            value={user.pincode}
            name="pincode"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.pincode}</small>}
        </div>
        <div className="mb-3">
          <label for="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={user.country}
            name="country"
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.country}</small>}
        </div>
        <div className="d-grid gap-2 mt-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Register
          </button>
          <small>
            Already having account? Click <Link to="/login">here</Link> to login
          </small>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Welcome to Friend Finder
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Make sure all the details are correct. You will not be able to
                  change your details
                </p>
              </div>
              <div className="modal-footer gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Go back
                </button>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
