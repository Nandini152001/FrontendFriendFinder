import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

const FriendList = () => {

  const [friend, setFriend] = useState({
    friends: [],
  });

  const userId = useSelector((state) => state.login.user.userId);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/friend/getAllFriendsBy/${params.id}`)
      .then(
        (res) => {
          setFriend({ friends: res.data });
        }
      )
      .catch((err) => console.groupCollapsed(err));
  }, []);
  return (
    <div>
      <h4 className="heading mt-5 text-center ">Friends</h4>
      <table className='table mt-5 w-75 mx-auto table-bordered border-dark'>
        <thead className="table-info border-dark">
          <tr>
            <th>UserId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>School</th>
            <th>College</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {friend.friends.map((fr) => (
            <tr key={fr.userId}>
              <td>{fr.userId}</td>
              <td>{fr.firstName}</td>
              <td>{fr.lastName}</td>
              <td>{fr.dob}</td>
              <td>{fr.email}</td>
              <td>{fr.mobile}</td>
              <td>{fr.school}</td>
              <td>{fr.college}</td>
              <td>{fr.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendList;
