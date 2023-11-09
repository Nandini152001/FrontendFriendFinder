import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";

const CreateComment = () => {
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    commentText: "",
  });

  const handleChange = (event) => {
    const updatedComment = { ...comment };
    updatedComment[event.target.name] = event.target.value;
    // console.log(event.target.name);
    // console.log(event.target.value);
    setComment(updatedComment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8081/posts/addComment/${id}`, comment)
      .then((res) => {
        console.log(res);
        alert("Comment Added successfully!");
        navigate("/post");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          mx: "auto",
          width: "35%",
          mt: 5,
          border: 1,
          p: 3,
          borderRadius: "16px",
          // borderColor: "primary.main",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          Create Comment
          {/* {dateNow} */}
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            id="outlined-required"
            label="Write a comment!"
            value={comment.commentText}
            name="commentText"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Comment
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default CreateComment;
