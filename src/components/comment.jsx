import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Comment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [commentObj, setComment] = useState({
    comment: [],
  });
  const [comId, setComId] = useState({
    idComm: {},
  });

  // useEffect -- callback function/method
  useEffect(() => {
    console.log(params);
    console.log(commentObj.comment);
    axios
      .get(`http://localhost:8081/posts/viewComments/${params.id}`)
      .then((res) => {
        console.log(res);
        setComId({ idComm: params.id });
        setComment({ comment: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleComment = (event) => {
    const upComment = { ...commentObj };
    upComment[event.target.name] = event.target.value;
    // console.log(event.target.name);
    // console.log(event.target.value);
    setComment(upComment);
  };

  // Delete Comment
  const handleDelete = (commentId) => {
    console.log(commentId);
    axios
      .delete(`http://localhost:8081/Comment/delete/${commentId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //   Auto-refresh
    //   after performing delete operation -to refresh the frontend page immediately use filter
    const upComment = commentObj.comment.filter(
      (comment) => comment.commentId != commentId
    );
    setComment({ comment: upComment });
  };

  return (
    <div className="text-center">
      <Button
        to={`/post/createComment/${comId.idComm}`}
        component={Link}
        variant="contained"
      >
        ADD COMMENT
      </Button>

      <table className="table mt-5 w-50 mx-auto">
        <thead>
          <tr>
            <th>commentId</th>
            <th>commentText</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commentObj.comment.map((comment1) => (
            <tr key={comment1.commentId}>
              <td>{comment1.commentId}</td>
              <td>{comment1.commentText}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(comment1.commentId)}
                >
                  Delete &nbsp;<i className="bi bi-trash3"></i>
                </button>{" "}
                <Button
                  to={`/reportComment/${comment1.commentId}`}
                  component={Link}
                  variant="contained"
                >
                  REPORT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comment;
