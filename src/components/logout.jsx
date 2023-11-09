import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/loginActions";

const Logout = () => {
  const dispatch = useDispatch();
  // connect store to get logged in user email address
  const email = useSelector((state) => state.login.user.email);
  useEffect(() => {
//    axios
//      .get(`http://localhost:8080/logout/${email}`)
//       .then((res) => console.log(res))
//      .catch((err) => console.log(err));
     localStorage.removeItem('User');
    dispatch(logoutAction(email));
  }, []);
  return (
    <div className=" mx-auto p-5">
      <h1>Logged out successfully!</h1>
      <small>
        Click <Link to="/login">here</Link> to login again.
      </small>
    </div>
  );
};

export default Logout;
{/*
import React from "react";

const Logout = () => {
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
};

export default Logout;
*/}
