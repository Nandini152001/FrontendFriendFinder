// import { TableCell, TableHead, TableRow, TableBody } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"; //importing for giving margin between delete and update button as both are in same cell
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    posts: [],
  };

  // life cycle methods in react class for class component
  // Get function
  componentDidMount() {
    axios
      .get("http://localhost:8081/posts/findAll")
      .then(
        // response => this.state = response ----state object is read only property --can't write like this
        (response) => {
          console.log(response);
          this.setState({ posts: response.data });
        }
      )
      .catch((err) => console.log(err));
  }

  // Delete Post
  handleDelete = (postId) => {
    console.log(postId);
    axios
      .delete(`http://localhost:8081/posts/delete/${postId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //   Auto-refresh
    //   after performing delete operation -to refresh the frontend page immediately use filter
    const updatedPost = this.state.posts.filter(
      (post) => post.postId != postId
    );
    this.setState({ posts: updatedPost });
  };

  handleLikes = (postId) => {
    let counter = document.querySelectorAll(".counter");
    counter.innerText++;
    // axios
    //   .put(`http://localhost:8081/posts/likes/${postId}`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // this.setState({ posts: counter++ });
  };

  render() {
    let fs = {
      fontSize: "20px",
    };
    return (
      <div style={{ backgroundColor: "rgb(250 246 233)" }}>
        <Box sx={{ pt: 3, width: "75%", mx: "auto" }} elevation={3}>
          {/* <Button */}
          {/* to="/post/create"
            variant="contained"
            component={Link}
            color="success"
            sx={{ mb: 2 }}
          > */}
          {/* //to give margin between button and table*/}
          {/* Create New Post &nbsp; <i className="bi bi-file-earmark-plus"></i> */}
          {/* </Button> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2fd3d5" }}>
                <TableRow>
                  <TableCell style={fs}>postId</TableCell>
                  <TableCell style={fs}>post_content</TableCell>
                  {/* <TableCell>postedOn</TableCell> */}
                  <TableCell className="text-center" style={fs}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  background: `URL(
                    "https://media.istockphoto.com/id/1187661304/photo/social-media.jpg?b=1&s=170667a&w=0&k=20&c=62NJqlPM5uaz40at0xOO5T8iOQkvYfAwjBya0_pW5kI="
                  ) no-repeat center / cover, rgb(140 127 208)`,
                  backgroundBlendMode: "multiply",
                }}
              >
                {this.state.posts.map((post) => (
                  <TableRow key={post.postId}>
                    <TableCell className="text-white fs-5">
                      {post.postId}
                    </TableCell>
                    <TableCell className="text-white fs-5">
                      {post.text}
                    </TableCell>
                    {/* <TableCell>{post.postedOn}</TableCell> */}
                    <TableCell className="text-white fs-5">
                      <Stack spacing={2} direction="row">
                        <Button
                          to={`/post/comment/${post.postId}`}
                          component={Link}
                          variant="contained"
                        >
                          Comment &nbsp;
                          <i className="bi bi-chat-fill"></i>
                        </Button>

                        <Button
                          to={`/post/update/${post.postId}`}
                          component={Link}
                          variant="outlined"
                          className="text-warning"
                        >
                          {/* Update &nbsp;{" "} */}
                          <i className="bi bi-pencil-square"></i>
                        </Button>

                        {/* DELETE FUNCTIONING BUTTON */}

                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => this.handleDelete(post.postId)}
                        >
                          {/* Delete &nbsp; */}
                          <i className="bi bi-trash3"></i>
                        </Button>

                        {/* REPORT BUTTON */}
                        <Button
                          to={`/reportPost/${post.postId}`}
                          component={Link}
                          variant="contained"
                        >
                          Report
                        </Button>

                        {/* LIKES BUTTON
                        // <Button
                        //   // to={`/post/like/${post.postId}`}
                        //   // component={Link}
                        //   variant="contained"
                        //   onClick={this.handleLikes}
                        // >
                        //   <i className="bi bi-suit-heart-fill counter">0</i>
                        // </Button> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    );
  }
}

export default Post;
