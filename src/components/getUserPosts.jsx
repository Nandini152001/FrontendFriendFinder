import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GetUserPosts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userObj, setUser] = useState({
    users: [],
  });

  useEffect(() => {
    console.log(params);
    console.log(userObj.users);
    axios
      .get(`http://localhost:8081/posts/view/${params.id}`)
      .then((res) => {
        console.log(res);
        setUser({ users: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  // // Delete Post
  // const handleDelete = (postId) => {
  //   console.log(postId);
  //   axios
  //     .delete(`http://localhost:8081/posts/delete/${postId}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  //   //   Auto-refresh
  //   //   after performing delete operation -to refresh the frontend page immediately use filter
  //   const updatedPost = this.state.posts.filter(
  //     (post) => post.postId != postId
  //   );
  //   this.setState({ posts: updatedPost });
  // };

  const handleUserPosts = (event) => {
    const upUser = { ...userObj };
    upUser[event.target.name] = event.target.value;
    // console.log(event.target.name);
    // console.log(event.target.value);
    setUser(upUser);
  };

  return (
    <div>
      <div className="text-center">
        {/* <a href="/post/view/:id" className="btn btn-success mt-5 "> */}
        {/* //to give margin between button and table*/}
        {/* Add new Comment &nbsp; <i className="bi bi-chat-left-heart-fill"></i> */}
        {/* </a> */}
        <table className="table mt-5 w-50 mx-auto">
          <thead>
            <tr>
              {/* <th>postId</th> */}
              <th>text</th>
              <th>postedOn</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {userObj.users.map((post) => (
              <tr key={post.postId}>
                <td>{post.text}</td>
                <td>{post.postedOn}</td>
                {/* <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(post.postId)}
                  >
                    Delete &nbsp;
                    <i className="bi bi-trash3"></i>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUserPosts;
