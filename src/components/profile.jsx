import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  //life cycle methods
  const [users, setUsers] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    mobile: "",
    school: "",
    college: "",
    role: "",
  });

  // const myStyle = {
  //   backgroundImage: "url(/nature.jpg)",
  //   // "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
  //   height: '90vh',
  //   marginTop: '0px',
  //   fontSize: '25px',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // };

  const userId = useSelector((state) => state.login.user.userId);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/friend/getUserBy/${userId}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.groupCollapsed(err));
  }, []);
  return (
    // style = { myStyle }
    <div className="row m-0">
      <div className="d-grid gap-2 d-md-flex me-auto">
        <div>
          <Button
            className="btn btn-info bg-opacity-75 mt-2 me-2"
            to={`/friendRequest/${users.userId}`}
            component={Link}
            variant="contained"
          >
            Friend Requests
          </Button>
          <Button
            className="btn btn-info bg-opacity-75 mt-2 me-2"
            to={`/friendList/${users.userId}`}
            component={Link}
            variant="contained"
          >
            Friends
          </Button>
        </div>
        <div className="ms-auto">
          <Button
            className="btn btn-primary me-2 mt-2"
            to={`/post/view/${users.userId}`}
            component={Link}
            variant="contained"
          >
            View Posts
          </Button>
          <Button
            className="btn btn-primary mt-2"
            to={`/post/add/${users.userId}`}
            component={Link}
            variant="contained"
          >
            Create New Post
          </Button>
        </div>
      </div>
      <div
        style={{
          background: "pink",
          background:
            "linear-gradient(90deg, rgba(2, 0, 36, 1) 0 %, rgba(122, 181, 205, 1) 51 %, rgba(0, 212, 255, 1) 100 %)",
          //     border: "2px solid gray",
          //     height: "263px",
          //     /* justify-content: center; */
          //     borderRadius: "25px",
          //     margin: "0 auto",
          width: "50%",
          margin: "0 auto",
          marginBottom: "30px",
          //     backgroundColor: "#bbb",
          //     borderRadius: "50%",
          //     display: "flex",
          //     justifyContent: "center",
          //     alignItems: "center"
        }}
      >
        {/* <AccountCircleIcon sx={{
          width: 200,
          height: 200
        }}></AccountCircleIcon> */}
        <Avatar
          variant="solid"
          sx={{
            width: 180,
            height: 180,
          }}
        />
        <h4>Welcome {users.firstName}</h4>

        <h5
          class="m-b-20 p-b-5 b-b-default f-w-600"
          style={{
            background: "#8a7f9c",
            margin: "0 auto",
            fontFamily: "-webkit-body",
            // fontSize: "xx-large",
          }}
        >
          Please check your details below here
        </h5>
        <hr />
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">FirstName</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.firstName}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">LastName</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.lastName}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">DOB</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.dob}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.email}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">Mobile No</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.mobile}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">School</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.school}</h6>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-6">
              <h6 class="mb-0">College</h6>
            </div>
            <div class="col-sm-6 text-secondary">
              <h6>{users.college}</h6>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Profile;
