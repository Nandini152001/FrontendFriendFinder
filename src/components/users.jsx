import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Users = () => {
  const mystyle = {
    float: "right",
    padding: "6px 10px",
    marginTop: "30px",
    marginRight: "16px",
    fontSize: "17px",
    border: "none",
    cursor: "pointer",
  };

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/friend/getAllUsers")
      .then((res) => {
        console.log(res);
        setAllUsers(res.data);
        setSearch(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // method to return customer based on search
  const handleCustomerSearch = (e) => {
    if (e.target.value == "") {
      setAllUsers(search);
    } else {
      const filterResult = search.filter((item) =>
        item.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setAllUsers(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <div>
      <div>
        <form className="d-flex" role="search" style={mystyle}>
          <input
            className="me-2"
            placeholder="Search"
            aria-label="Search"
            value={filterVal}
            onInput={(e) => handleCustomerSearch(e)}
          />
          <button className="btn btn-primary" type="button" disabled>
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <div className="mt-100">
        <table className="table table-hover w-50 mx-auto  table-striped">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u.userId}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>
                  <Button
                    to={`/sendRequest/${u.userId}`}
                    component={Link}
                    variant="contained"
                  >
                    Send Request
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
