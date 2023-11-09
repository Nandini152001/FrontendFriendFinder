import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Joi from "joi-browser";

const Complaint = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    comp_msg: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const userId = useSelector((state) => state.login.user.userId);

  //Step1: Define schema to validate form data
  const schema = Joi.object({
    comp_msg: Joi.string().min(3).max(15).required(),
    comment: Joi.string().min(3).max(30).required(),
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
      .put(
        `http://localhost:8081/complaint/add/${userId}/${user.comp_msg}/${user.comment}`,
        user
      )
      .then((res) => {
        console.log(res);
        alert("Your complaint have been registerd!!");
        navigate("/viewComplaint");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="border border-dark p-2 rounded p-5 w-50 mx-auto mt-5">
        <h1 className="text-center" data-testid="title">
          ADD COMPLAINT
        </h1>
        <form className="mr-auto mt-3" onSubmit={handleSubmit}>
          <div className="row mb-3 mt-2">
            <label for="comp_msg" className="col-sm-2 col-form-label">
              Message
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="comp_msg"
                value={user.comp_msg}
                name="comp_msg"
                onChange={handleChange}
              />
            </div>
            {errors && <small className="text-danger">{errors.comp_msg}</small>}
          </div>
          <div className="row mb-3">
            <label for="comment" className="col-sm-2 col-form-label">
              Comment
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="comment"
                value={user.comment}
                name="comment"
                onChange={handleChange}
              />
            </div>
            {errors && <small className="text-danger">{errors.comment}</small>}
          </div>
          <button type="submit" className="btn btn-light">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
