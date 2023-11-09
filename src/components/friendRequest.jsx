import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const FriendRequest = () => {

  const [request, setRequest] = useState({
    receivedRequest: [],
  });

  const userId = useSelector((state) => state.login.user.userId);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/friend/getAllReceivedRequest/${params.id}`)
      .then(
        (res) => {
          setRequest({ receivedRequest: res.data });
        }
      )
      .catch((err) => console.groupCollapsed(err));
  }, []);
  return (
    <div>
      <h4 className="heading mt-5 text-center ">Friend Requests</h4>
      <table className='table mt-5 w-75 mx-auto table-bordered border-dark'>
        <thead className="table-info border-dark">
          <tr>
            <th>RequestId</th>
            <th>Date Of Request</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {request.receivedRequest.map((req) => (
            <tr key={req.friendRequestId}>
              <td>{req.friendRequestId}</td>
              <td>{req.dateOfRequest}</td>
              <td>{req.message}</td>
              <td>
                <div class="col-sm-8">
                  <h6> <Button
                    to={`/acceptRequest/${userId}`}
                    component={Link}
                    variant="contained"
                  >
                    Accept Request
                  </Button></h6>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendRequest;
