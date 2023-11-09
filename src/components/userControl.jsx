import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const UserControl = () => {
  const [users, setUsers] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/friend/getAllUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.groupCollapsed(err));
  }, []);

  const handleBlock = (userId) => {
    axios
      .put(`http://localhost:8081/admin/blockUser/${userId}`) //Backticks are used far variable sustitution
      .then((res) => {
        setUsers(res.data);
        alert("User is blocked!");
        // navigate("/userControl")
      })
      .catch((err) => console.log(err));
  };

  const handleUnblock = (userId) => {
    axios
      .put(`http://localhost:8081/admin/unblockUser/${userId}`) //Backticks are used far variable sustitution
      .then((res) => {
        setUsers(res.data);
        alert("User is unblocked!");
        // navigate("/userControl")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table className="table mt-5 w-50 mx-auto table-bordered border-dark">
        <thead>
          <tr>
            <th> UserId</th>
            <th> First Name</th>
            <th> Status</th>
            <th className="text-center"> Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.firstName}</td>
              <td>{u.status}</td>
              <td className="text-center">
                <Button
                  className="btn btn-info bg-opacity-75 mt-2 ms-2"
                  variant="contained"
                  // to="/userControl"
                  // component={Link}
                  onClick={() => handleBlock(u.userId)}
                >
                  Block
                </Button>
                <Button
                  className="btn btn-info bg-opacity-75 mt-2 ms-2"
                  // to="/unblock"
                  // component={Link}
                  variant="contained"
                  onClick={() => handleUnblock(u.userId)}
                >
                  Unblock
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserControl;
