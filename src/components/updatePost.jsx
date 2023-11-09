import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    postId: 0,
    text: "",
  });

  // useEffect -- callback function/method
  useEffect(() => {
    console.log(params);
    axios
      .get(`http://localhost:8081/posts/get/dto/${params.id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const updatedPost = { ...post };
    updatedPost[event.target.name] = event.target.value;
    // console.log(event.target.name);
    // console.log(event.target.value);
    setPost(updatedPost);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/posts/update/dto", post)
      .then((res) => {
        console.log("yayy");
        alert("Updated post successfully!");
        navigate("/post");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "#eed1cc", height: "90vh", padding: "4rem" }}
    >
      <form onSubmit={handleSubmit}>
        <h4 className="text-center">Update your post</h4>
        <div className="mb-3">
          {/* <fieldset disabled> */}
          <label htmlFor="autogenPostId" className="form-label">
            postId
          </label>
          <input
            type="number"
            className="form-control"
            id="autogenPostId1"
            disabled
            value={post.postId}
            name="postId"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            This is system generated value.
          </div>
          {/* </fieldset> */}
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">
            What to update?
          </label>
          <input
            type="text"
            className="form-control"
            id="postContent"
            value={post.text}
            name="text"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      {/* <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Do you want to update this post?
        </label>
      </div> */}
    </div>
  );
};

export default UpdatePost;
